from fastapi import FastAPI
from sentence_transformers import SentenceTransformer
import uvicorn

app = FastAPI()
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

@app.post("/embed/")
async def embed(text: str):
    embedding = model.encode([text], show_progress_bar=False)
    return {"embedding": embedding.tolist()}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)