const API_BASE_URL = "http://localhost:5000/api";

export interface ClusteringResponse {
  tsne: number[][];
  labels: number[];
  paths: string[];
}

async function getEmbeddings(): Promise<number[][]> {
  // TODO: Implement your embedding retrieval logic
  console.log("getEmbeddings");
  return [];
}

async function getImagePaths(): Promise<string[]> {
  // TODO: Implement your image path retrieval logic
  console.log("getImagePaths");
  return [];
}

export async function performClustering(n_clusters: number): Promise<ClusteringResponse> {
  // Fetch embeddings from your storage/state
  const embeddings = await getEmbeddings(); // You'll need to implement this
  const imagePaths = await getImagePaths(); // You'll need to implement this

  const response = await fetch(`${API_BASE_URL}/cluster`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      n_clusters,
      embeddings,
      image_paths: imagePaths,
    }),
  });

  if (!response.ok) {
    throw new Error("Clustering request failed");
  }

  return response.json();
}

export async function getOptimalK(): Promise<number> {
  // Fetch embeddings from your storage/state
  const embeddings = await getEmbeddings(); // You'll need to implement this

  const response = await fetch(`${API_BASE_URL}/optimal-k`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embeddings,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get optimal K");
  }

  const data = await response.json();
  return data.optimal_k;
}
