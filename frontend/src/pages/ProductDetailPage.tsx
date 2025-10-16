import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../product/ProductList';
import ProductDetail from '../product/ProductDetail';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
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
