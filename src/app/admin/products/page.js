'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

const categories = [
  'Fruits & Vegetables','Dairy & Eggs','Bakery',
  'Meat & Seafood','Beverages','Snacks','Pantry','Frozen Foods',
];

const emptyForm = { name:'', description:'', price:'', category:categories[0], stock:'', image:'', unit:'piece' };

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState('');

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return;
    if (!user) { router.push('/adminlogin'); return; }
    if (user.role !== 'admin') { router.push('/adminlogin'); return; }
    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch { setError('Failed to load products'); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSubmitting(true);
    try {
      if (editingProduct) { await api.put(`/products/${editingProduct._id}`, formData); }
      else { await api.post('/products', formData); }
      setShowForm(false); setEditingProduct(null); setFormData(emptyForm);
      fetchProducts();
    } catch (err) { setError(err.response?.data?.message || 'Failed to save product'); }
    finally { setSubmitting(false); }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({ name:product.name, description:product.description, price:product.price, category:product.category, stock:product.stock, image:product.image, unit:product.unit });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    setDeletingId(id);
    try { await api.delete(`/products/${id}`); fetchProducts(); }
    catch { alert('Failed to delete product'); }
    finally { setDeletingId(null); }
  };

  const handleCancel = () => {
    setShowForm(false); setEditingProduct(null);
    setFormData(emptyForm); setError('');
  };

  if (user === undefined) return null;
  if (!user || user.role !== 'admin') return null;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        :root {
          --g-deep:#0d2b1f; --g-rich:#1a4731; --g-main:#2d6a4f;
          --g-vivid:#52b788; --g-pale:#d8f3dc; --g-soft:#f0faf4;
          --cream:#faf8f3; --charcoal:#1c1c1e; --muted:#6b7280;
          --border:rgba(45,106,79,0.11);
          --t:all 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        .ap-page { font-family:'Outfit',sans-serif; background:var(--cream); min-height:100vh; }

        /* HERO */
        .ap-hero { background:linear-gradient(140deg,var(--g-deep),#1a3a2a 55%,#0f2d1f); padding:44px 40px 52px; position:relative; overflow:hidden; }
        .ap-hero-dots { position:absolute; inset:0; background-image:radial-gradient(rgba(82,183,136,0.07) 1.5px,transparent 1.5px); background-size:24px 24px; pointer-events:none; }
        .ap-hero-glow { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(82,183,136,0.08),transparent 70%); top:-150px; right:-100px; pointer-events:none; }
        .ap-hero-inner { position:relative; z-index:1; max-width:1300px; margin:0 auto; display:flex; align-items:flex-end; justify-content:space-between; flex-wrap:wrap; gap:20px; }
        .ap-hero-tag { display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:var(--g-vivid); margin-bottom:14px; }
        .ap-tag-dash { width:20px; height:1.5px; background:var(--g-vivid); border-radius:2px; }
        .ap-hero-title { font-family:'Cormorant Garamond',serif; font-size:clamp(32px,4.5vw,54px); font-weight:700; color:white; margin:0 0 6px; line-height:1.05; letter-spacing:-0.5px; }
        .ap-hero-title em { font-style:normal; color:var(--g-vivid); }
        .ap-hero-sub { font-size:14px; font-weight:300; color:rgba(255,255,255,0.45); margin:0; }
        .ap-hero-actions { display:flex; gap:10px; flex-shrink:0; }
        .ap-add-btn { display:inline-flex; align-items:center; gap:8px; font-family:'Outfit',sans-serif; font-size:13px; font-weight:600; padding:11px 22px; border-radius:10px; cursor:pointer; border:none; transition:var(--t); background:linear-gradient(135deg,var(--g-vivid),var(--g-main)); color:white; box-shadow:0 4px 14px rgba(82,183,136,0.30); text-decoration:none; }
        .ap-add-btn:hover { transform:translateY(-2px); box-shadow:0 8px 22px rgba(82,183,136,0.40); }
        .ap-back-btn { display:inline-flex; align-items:center; gap:8px; font-family:'Outfit',sans-serif; font-size:13px; font-weight:600; padding:11px 20px; border-radius:10px; cursor:pointer; text-decoration:none; transition:var(--t); background:rgba(255,255,255,0.10); border:1px solid rgba(255,255,255,0.20); color:rgba(255,255,255,0.80); }
        .ap-back-btn:hover { background:rgba(255,255,255,0.18); }

        /* MAIN */
        .ap-main { max-width:1300px; margin:0 auto; padding:32px 40px 80px; }

        /* ERROR */
        .ap-error { display:flex; align-items:center; gap:10px; background:#fff5f5; border:1.5px solid rgba(229,62,62,0.22); border-radius:14px; padding:14px 18px; color:#c53030; font-size:13px; font-weight:500; margin-bottom:24px; }

        /* FORM CARD */
        .ap-form-card { background:white; border-radius:24px; border:1.5px solid var(--border); box-shadow:0 8px 32px rgba(13,43,31,0.08); margin-bottom:28px; overflow:hidden; }
        .ap-form-header { padding:22px 28px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; gap:14px; background:var(--g-soft); }
        .ap-form-header-left { display:flex; align-items:center; gap:14px; }
        .ap-form-icon { width:42px; height:42px; border-radius:12px; background:var(--g-main); display:flex; align-items:center; justify-content:center; color:white; flex-shrink:0; }
        .ap-form-title { font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:700; color:var(--g-deep); margin:0 0 2px; }
        .ap-form-sub { font-size:12px; font-weight:300; color:var(--muted); margin:0; }
        .ap-form-body { padding:28px 28px 32px; }
        .ap-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        .ap-form-full { grid-column:1/-1; }
        .ap-field { display:flex; flex-direction:column; gap:7px; }
        .ap-label { font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--charcoal); }
        .ap-input-wrap { position:relative; }
        .ap-input-icon { position:absolute; left:13px; top:50%; transform:translateY(-50%); color:var(--muted); pointer-events:none; }
        .ap-input, .ap-select, .ap-textarea {
          width:100%; padding:12px 16px 12px 38px; border:1.5px solid var(--border); border-radius:12px;
          font-family:'Outfit',sans-serif; font-size:14px; color:var(--charcoal);
          background:var(--cream); outline:none; transition:var(--t); box-sizing:border-box;
          box-shadow:0 1px 3px rgba(0,0,0,0.03);
        }
        .ap-select { padding-left:38px; cursor:pointer; }
        .ap-textarea { padding:12px 16px; resize:none; line-height:1.6; }
        .ap-input:focus,.ap-select:focus,.ap-textarea:focus { border-color:var(--g-vivid); background:white; box-shadow:0 0 0 3px rgba(82,183,136,0.12); }
        .ap-input::placeholder,.ap-textarea::placeholder { color:#b8c0cc; }
        .ap-img-preview { width:60px; height:60px; border-radius:10px; object-fit:cover; border:1.5px solid var(--border); display:block; margin-top:8px; }
        .ap-form-actions { display:flex; gap:12px; margin-top:24px; flex-wrap:wrap; }
        .ap-submit-btn { display:inline-flex; align-items:center; gap:8px; padding:13px 28px; background:linear-gradient(135deg,var(--g-main),var(--g-deep)); color:white; border:none; border-radius:12px; font-family:'Outfit',sans-serif; font-size:14px; font-weight:600; cursor:pointer; transition:var(--t); box-shadow:0 4px 14px rgba(45,106,79,0.25); }
        .ap-submit-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 22px rgba(45,106,79,0.35); }
        .ap-submit-btn:disabled { opacity:0.65; cursor:not-allowed; transform:none; }
        .ap-cancel-btn { display:inline-flex; align-items:center; gap:8px; padding:13px 24px; background:white; color:var(--muted); border:1.5px solid var(--border); border-radius:12px; font-family:'Outfit',sans-serif; font-size:14px; font-weight:600; cursor:pointer; transition:var(--t); }
        .ap-cancel-btn:hover { background:var(--cream); border-color:rgba(107,114,128,0.30); color:var(--charcoal); }
        .ap-spinner { width:16px; height:16px; border:2px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation:spin 0.7s linear infinite; }
        @keyframes spin { to{transform:rotate(360deg);} }

        /* TABLE CARD */
        .ap-table-card { background:white; border-radius:24px; border:1.5px solid var(--border); box-shadow:0 4px 20px rgba(13,43,31,0.06); overflow:hidden; }
        .ap-table-header { padding:20px 28px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:14px; }
        .ap-table-header-left { display:flex; align-items:center; gap:14px; }
        .ap-table-icon { width:42px; height:42px; border-radius:12px; background:var(--g-soft); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; color:var(--g-main); flex-shrink:0; }
        .ap-table-title { font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:700; color:var(--g-deep); margin:0 0 2px; }
        .ap-table-sub { font-size:12px; font-weight:300; color:var(--muted); margin:0; }
        .ap-search-wrap { position:relative; }
        .ap-search-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--muted); pointer-events:none; }
        .ap-search { padding:10px 16px 10px 38px; border:1.5px solid var(--border); border-radius:10px; font-family:'Outfit',sans-serif; font-size:13px; color:var(--charcoal); background:var(--cream); outline:none; transition:var(--t); width:220px; }
        .ap-search:focus { border-color:var(--g-vivid); background:white; box-shadow:0 0 0 3px rgba(82,183,136,0.10); }
        .ap-search::placeholder { color:#b8c0cc; }

        /* TABLE */
        .ap-table { width:100%; border-collapse:collapse; }
        .ap-thead { background:var(--g-soft); }
        .ap-th { padding:13px 20px; text-align:left; font-size:10px; font-weight:700; letter-spacing:0.10em; text-transform:uppercase; color:var(--muted); white-space:nowrap; }
        .ap-tr { border-top:1px solid var(--border); transition:var(--t); }
        .ap-tr:hover { background:rgba(240,250,244,0.5); }
        .ap-td { padding:14px 20px; vertical-align:middle; }
        .ap-product-cell { display:flex; align-items:center; gap:12px; }
        .ap-product-img { width:52px; height:52px; border-radius:12px; object-fit:cover; border:1px solid var(--border); flex-shrink:0; }
        .ap-product-name { font-size:14px; font-weight:600; color:var(--charcoal); display:block; margin-bottom:2px; }
        .ap-product-unit { font-size:11px; color:var(--muted); font-weight:400; }
        .ap-cat-pill { display:inline-flex; align-items:center; font-size:11px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; padding:4px 10px; border-radius:20px; background:var(--g-soft); color:var(--g-main); border:1px solid var(--border); white-space:nowrap; }
        .ap-price { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:700; color:var(--g-rich); }
        .ap-stock-badge { display:inline-flex; align-items:center; gap:5px; font-size:12px; font-weight:600; padding:4px 10px; border-radius:20px; border:1px solid; }
        .ap-stock-in { background:rgba(45,106,79,0.10); color:var(--g-rich); border-color:rgba(45,106,79,0.22); }
        .ap-stock-out { background:rgba(220,38,38,0.08); color:#b91c1c; border-color:rgba(220,38,38,0.20); }
        .ap-action-btns { display:flex; gap:8px; }
        .ap-edit-btn { display:inline-flex; align-items:center; gap:5px; padding:7px 14px; border-radius:8px; font-family:'Outfit',sans-serif; font-size:12px; font-weight:600; cursor:pointer; border:1.5px solid rgba(37,99,235,0.25); background:rgba(37,99,235,0.06); color:#1d4ed8; transition:var(--t); }
        .ap-edit-btn:hover { background:rgba(37,99,235,0.12); border-color:rgba(37,99,235,0.40); }
        .ap-delete-btn { display:inline-flex; align-items:center; gap:5px; padding:7px 14px; border-radius:8px; font-family:'Outfit',sans-serif; font-size:12px; font-weight:600; cursor:pointer; border:1.5px solid rgba(220,38,38,0.22); background:rgba(220,38,38,0.06); color:#b91c1c; transition:var(--t); }
        .ap-delete-btn:hover { background:rgba(220,38,38,0.12); border-color:rgba(220,38,38,0.38); }
        .ap-delete-btn:disabled { opacity:0.5; cursor:not-allowed; }
        .ap-del-spinner { width:12px; height:12px; border:1.5px solid rgba(185,28,28,0.3); border-top-color:#b91c1c; border-radius:50%; animation:spin 0.7s linear infinite; }

        /* empty */
        .ap-empty { padding:64px 20px; text-align:center; }
        .ap-empty-icon { font-size:48px; opacity:0.35; display:block; margin-bottom:14px; }
        .ap-empty-title { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:700; color:var(--g-deep); margin:0 0 8px; }
        .ap-empty-sub { font-size:14px; color:var(--muted); }

        /* skeleton */
        .ap-skeleton-row td { padding:14px 20px; }
        .ap-skel { border-radius:6px; background:linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%); background-size:200% 100%; animation:shimmer 1.4s infinite; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        @media(max-width:1024px) { .ap-form-grid{grid-template-columns:1fr;} }
        @media(max-width:768px) {
          .ap-hero{padding:36px 20px 40px;} .ap-main{padding:24px 20px 60px;}
          .ap-hero-inner{flex-direction:column;align-items:flex-start;}
          .ap-search{width:100%;} .ap-table-header{flex-direction:column;align-items:flex-start;}
        }
      `}</style>

      <div className="ap-page">
        {/* HERO */}
        <div className="ap-hero">
          <div className="ap-hero-dots" />
          <div className="ap-hero-glow" />
          <div className="ap-hero-inner">
            <div>
              <div className="ap-hero-tag"><span className="ap-tag-dash" /> Admin Portal <span className="ap-tag-dash" /></div>
              <h1 className="ap-hero-title">Manage <em>Products</em></h1>
              <p className="ap-hero-sub">{products.length} product{products.length !== 1 ? 's' : ''} in your catalog</p>
            </div>
            <div className="ap-hero-actions">
              {!showForm && (
                <button onClick={() => setShowForm(true)} className="ap-add-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add Product
                </button>
              )}
              <Link href="/admin/dashboard" className="ap-back-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="ap-main">
          {error && (
            <div className="ap-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          {/* FORM */}
          {showForm && (
            <div className="ap-form-card">
              <div className="ap-form-header">
                <div className="ap-form-header-left">
                  <div className="ap-form-icon">
                    {editingProduct
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    }
                  </div>
                  <div>
                    <h2 className="ap-form-title">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                    <p className="ap-form-sub">{editingProduct ? 'Update the product details below' : 'Fill in the details to add a new product'}</p>
                  </div>
                </div>
                <button onClick={handleCancel} style={{background:'none',border:'none',cursor:'pointer',color:'var(--muted)',display:'flex',alignItems:'center',gap:4,fontSize:13,fontFamily:'Outfit'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
              </div>

              <div className="ap-form-body">
                <form onSubmit={handleSubmit}>
                  <div className="ap-form-grid">
                    {/* Name */}
                    <div className="ap-field">
                      <label className="ap-label">Product Name *</label>
                      <div className="ap-input-wrap">
                        <span className="ap-input-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg></span>
                        <input className="ap-input" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Fresh Organic Bananas" />
                      </div>
                    </div>
                    {/* Category */}
                    <div className="ap-field">
                      <label className="ap-label">Category *</label>
                      <div className="ap-input-wrap">
                        <span className="ap-input-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h7"/></svg></span>
                        <select className="ap-select" name="category" value={formData.category} onChange={handleChange} required>
                          {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    {/* Price */}
                    <div className="ap-field">
                      <label className="ap-label">Price ($) *</label>
                      <div className="ap-input-wrap">
                        <span className="ap-input-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></span>
                        <input className="ap-input" type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" placeholder="2.99" />
                      </div>
                    </div>
                    {/* Stock */}
                    <div className="ap-field">
                      <label className="ap-label">Stock *</label>
                      <div className="ap-input-wrap">
                        <span className="ap-input-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg></span>
                        <input className="ap-input" type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" placeholder="100" />
                      </div>
                    </div>
                    {/* Unit */}
                    <div className="ap-field">
                      <label className="ap-label">Unit *</label>
                      <div className="ap-input-wrap">
                        <span className="ap-input-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg></span>
                        <input className="ap-input" type="text" name="unit" value={formData.unit} onChange={handleChange} required placeholder="piece, kg, lb..." />
                      </div>
                    </div>
                    {/* Image */}
                    <div className="ap-field">
                      <label className="ap-label">Image URL *</label>
                      <div className="ap-input-wrap">
                        <span className="ap-input-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></span>
                        <input className="ap-input" type="url" name="image" value={formData.image} onChange={handleChange} required placeholder="https://example.com/image.jpg" />
                      </div>
                      {formData.image && <img src={formData.image} alt="preview" className="ap-img-preview" onError={e => e.target.style.display='none'} />}
                    </div>
                    {/* Description */}
                    <div className="ap-field ap-form-full">
                      <label className="ap-label">Description *</label>
                      <textarea className="ap-textarea" name="description" value={formData.description} onChange={handleChange} required rows={3} placeholder="Sweet and ripe organic bananas, perfect for..." />
                    </div>
                  </div>

                  <div className="ap-form-actions">
                    <button type="submit" className="ap-submit-btn" disabled={submitting}>
                      {submitting
                        ? <><span className="ap-spinner" /> Saving...</>
                        : <>{editingProduct ? 'Update Product' : 'Add Product'} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                      }
                    </button>
                    <button type="button" onClick={handleCancel} className="ap-cancel-btn">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TABLE */}
          <div className="ap-table-card">
            <div className="ap-table-header">
              <div className="ap-table-header-left">
                <div className="ap-table-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
                </div>
                <div>
                  <h2 className="ap-table-title">All Products</h2>
                  <p className="ap-table-sub">{filtered.length} of {products.length} shown</p>
                </div>
              </div>
              <div className="ap-search-wrap">
                <span className="ap-search-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></span>
                <input className="ap-search" type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>

            <div style={{overflowX:'auto'}}>
              <table className="ap-table">
                <thead className="ap-thead">
                  <tr>
                    {['Product','Category','Price','Stock','Actions'].map(h => (
                      <th key={h} className="ap-th">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    [1,2,3,4].map(i => (
                      <tr key={i} className="ap-skeleton-row" style={{borderTop:'1px solid var(--border)'}}>
                        <td><div style={{display:'flex',gap:12,alignItems:'center'}}><div className="ap-skel" style={{width:52,height:52,borderRadius:12,flexShrink:0}} /><div className="ap-skel" style={{height:13,width:120,borderRadius:6}} /></div></td>
                        <td><div className="ap-skel" style={{height:24,width:100,borderRadius:20}} /></td>
                        <td><div className="ap-skel" style={{height:20,width:56,borderRadius:6}} /></td>
                        <td><div className="ap-skel" style={{height:24,width:60,borderRadius:20}} /></td>
                        <td><div style={{display:'flex',gap:8}}><div className="ap-skel" style={{height:32,width:60,borderRadius:8}} /><div className="ap-skel" style={{height:32,width:68,borderRadius:8}} /></div></td>
                      </tr>
                    ))
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={5}>
                      <div className="ap-empty">
                        <span className="ap-empty-icon">🔍</span>
                        <h3 className="ap-empty-title">{search ? 'No results found' : 'No products yet'}</h3>
                        <p className="ap-empty-sub">{search ? `No products match "${search}"` : 'Add your first product using the button above.'}</p>
                      </div>
                    </td></tr>
                  ) : (
                    filtered.map(product => (
                      <tr key={product._id} className="ap-tr">
                        <td className="ap-td">
                          <div className="ap-product-cell">
                            <img src={product.image} alt={product.name} className="ap-product-img" />
                            <div>
                              <span className="ap-product-name">{product.name}</span>
                              <span className="ap-product-unit">per {product.unit}</span>
                            </div>
                          </div>
                        </td>
                        <td className="ap-td"><span className="ap-cat-pill">{product.category}</span></td>
                        <td className="ap-td"><span className="ap-price">${product.price.toFixed(2)}</span></td>
                        <td className="ap-td">
                          <span className={`ap-stock-badge ${product.stock > 0 ? 'ap-stock-in' : 'ap-stock-out'}`}>
                            {product.stock > 0
                              ? <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{product.stock}</>
                              : <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Out</>
                            }
                          </span>
                        </td>
                        <td className="ap-td">
                          <div className="ap-action-btns">
                            <button onClick={() => handleEdit(product)} className="ap-edit-btn">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                              Edit
                            </button>
                            <button onClick={() => handleDelete(product._id)} className="ap-delete-btn" disabled={deletingId === product._id}>
                              {deletingId === product._id
                                ? <><span className="ap-del-spinner" /> Deleting</>
                                : <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>Delete</>
                              }
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}