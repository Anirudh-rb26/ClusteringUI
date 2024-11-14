from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.cluster import KMeans
from sklearn.manifold import TSNE
import json
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/cluster', methods=['POST'])
def do_clustering():
    try:
        logger.info("=== Received clustering request ===")
        data = request.get_json()
        
        # Log the request details
        n_clusters = data.get('n_clusters', 5)
        embeddings = np.array(data.get('embeddings'))
        image_paths = data.get('image_paths', [])
        
        logger.info(f"Received request with:")
        logger.info(f"• Number of clusters requested: {n_clusters}")
        logger.info(f"• Number of embeddings: {len(embeddings)}")
        logger.info(f"• Number of image paths: {len(image_paths)}")
        logger.info(f"• Shape of embeddings: {embeddings.shape}")
        
        # Perform K-means clustering
        logger.info(f"Starting K-means clustering with {n_clusters} clusters...")
        kmeans = KMeans(n_clusters=n_clusters, random_state=42)
        cluster_labels = kmeans.fit_predict(embeddings)
        logger.info(f"Clustering complete. Unique labels: {np.unique(cluster_labels)}")
        
        # Perform t-SNE
        logger.info("Starting t-SNE dimensionality reduction...")
        tsne = TSNE(n_components=2, random_state=42)
        tsne_results = tsne.fit_transform(embeddings)
        logger.info(f"t-SNE complete. Output shape: {tsne_results.shape}")
        
        response = {
            "tsne": tsne_results.tolist(),
            "labels": cluster_labels.tolist(),
            "paths": image_paths
        }
        
        logger.info("=== Sending response back to client ===")
        return jsonify(response)
    except Exception as e:
        logger.error(f"Error in clustering: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500

@app.route('/api/optimal-k', methods=['GET'])
def get_optimal_k():
    try:
        data = request.get_json()
        embeddings = data.get('embeddings', [])
        num_images = len(embeddings)
        optimal_k = max(1, int(num_images/30))
        
        logger.info(f"Calculated optimal k: {optimal_k} for {num_images} images")
        return jsonify({"optimal_k": optimal_k})
    except Exception as e:
        logger.error(f"Error in optimal-k: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)