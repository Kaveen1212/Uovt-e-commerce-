import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { productService } from '../services';
import ProductDetail from '../product/ProductDetail';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      setError('');
      const data = await productService.getProductById(productId);
      setProduct(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load product');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error || 'Product not found'}</h1>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} onClose={() => navigate('/products')} />;
}

export default ProductDetailPage;
