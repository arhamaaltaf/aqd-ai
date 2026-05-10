import os
from pathlib import Path

from flask import Flask, Response, jsonify, request, send_from_directory
from flask_cors import CORS

from rag_pipeline import (
    analyze_contract_text,
    environment_status,
    extract_text_from_docx_bytes,
    extract_text_from_pdf_bytes,
)


BASE_DIR = Path(__file__).resolve().parent


def resolve_static_folder() -> str:
    candidates = [
        BASE_DIR / "aqd-ai" / "dist",
        BASE_DIR / "dist",
    ]

    for candidate in candidates:
        if (candidate / "index.html").exists():
            return str(candidate)

    return str(candidates[0])


FRONTEND_STATIC_FOLDER = resolve_static_folder()
app = Flask(__name__, static_folder=None)
app.static_folder = FRONTEND_STATIC_FOLDER
CORS(app)


def _client_shell() -> Response:
    static_folder = Path(app.static_folder)
    index_file = static_folder / "index.html"
    if index_file.exists():
        return send_from_directory(app.static_folder, "index.html")
    return Response("Frontend build not found. Run npm run build in aqd-ai.", status=500)


def _contract_text_from_request() -> str:
    if request.files:
        uploaded = request.files.get("file")
        if uploaded is None:
            raise ValueError("Expected multipart field named 'file'.")

        filename = (uploaded.filename or "").lower()
        file_bytes = uploaded.read()

        if filename.endswith(".pdf") or uploaded.mimetype == "application/pdf":
            return extract_text_from_pdf_bytes(file_bytes)

        if filename.endswith(".docx"):
            return extract_text_from_docx_bytes(file_bytes)

        return file_bytes.decode("utf-8", errors="ignore")

    data = request.get_json(silent=True) or {}
    return (data.get("contractText") or data.get("query") or "").strip()


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify(
        {
            "status": "ok",
            "service": "Aqd AI Shariah Compliance Scanner",
            "environment": environment_status(),
        }
    )


@app.route("/api/analyze", methods=["POST"])
def analyze_contract():
    try:
        contract_text = _contract_text_from_request()
        result = analyze_contract_text(contract_text)
        return jsonify({"success": True, **result})
    except ValueError as exc:
        return jsonify({"success": False, "error": str(exc)}), 400
    except Exception as exc:
        app.logger.exception("Contract analysis failed")
        return jsonify({"success": False, "error": f"Analysis failed: {exc}"}), 500


@app.route("/api/query", methods=["POST"])
def query_alias():
    return analyze_contract()


@app.route("/", methods=["GET"])
def serve_index():
    return _client_shell()


@app.route("/assets/<path:filename>", methods=["GET"])
def serve_assets(filename):
    return send_from_directory(Path(app.static_folder) / "assets", filename)


@app.route("/<path:path>", methods=["GET"])
def serve_static(path):
    target = Path(app.static_folder) / path
    if path and target.exists():
        return send_from_directory(app.static_folder, path)
    return _client_shell()


if __name__ == "__main__":
    port = int(os.getenv("PORT", "7860"))
    app.run(host="0.0.0.0", port=port, debug=False)
