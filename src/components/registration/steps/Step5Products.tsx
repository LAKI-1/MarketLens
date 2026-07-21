import { useRegistration } from '../RegistrationContext';
import FormField, { Input, Textarea } from '../ui/FormField';
import SelectDropdown from '../ui/SelectDropdown';
import { Plus, Trash2, Box } from 'lucide-react';

const pricingModels = [
  { label: 'Subscription / Recurring', value: 'Subscription' },
  { label: 'One-time Purchase', value: 'One-time Purchase' },
  { label: 'Freemium', value: 'Freemium' },
  { label: 'Usage / Pay-as-you-go', value: 'Usage Based' },
  { label: 'Tiered Pricing', value: 'Tiered Pricing' },
  { label: 'Per User / Per Seat', value: 'Per User' },
  { label: 'Commission / Transaction Fee', value: 'Commission' },
  { label: 'Marketplace', value: 'Marketplace' },
  { label: 'Advertisement Supported', value: 'Advertisement Supported' },
  { label: 'Free', value: 'Free' },
  { label: 'Custom / Enterprise', value: 'Custom' },
];

const frequencies = [
  { label: 'Monthly', value: 'Monthly' },
  { label: 'Annual / Yearly', value: 'Annual' },
  { label: 'Quarterly', value: 'Quarterly' },
  { label: 'One-time', value: 'One-time' },
  { label: 'Weekly', value: 'Weekly' },
  { label: 'Pay-as-you-go', value: 'Pay-as-you-go' },
  { label: 'Custom', value: 'Custom' },
];

export default function Step5Products() {
  const { data, addProduct, updateProduct, removeProduct } = useRegistration();
  const { products } = data;

  const handlePriceChange = (id: string, val: string) => {
    if (val === '' || /^[0-9]+(\.[0-9]{0,2})?$/.test(val)) {
      updateProduct(id, { price: val });
    }
  };

  const handlePricingModelChange = (id: string, modelVal: string) => {
    const targetProduct = products.find(p => p.id === id);
    const updates: Partial<typeof products[0]> = { pricingModel: modelVal };

    // Auto-suggest matching frequency if not set
    if (targetProduct && !targetProduct.frequency) {
      if (modelVal === 'One-time Purchase' || modelVal === 'Free') {
        updates.frequency = 'One-time';
      } else if (modelVal === 'Subscription' || modelVal === 'Tiered Pricing' || modelVal === 'Per User') {
        updates.frequency = 'Monthly';
      } else if (modelVal === 'Usage Based') {
        updates.frequency = 'Pay-as-you-go';
      }
    }
    updateProduct(id, updates);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">Products & Services</h1>
          <p className="text-brand-neutral mt-2">
            Add the primary offerings of your business. You can add multiple products.
          </p>
        </div>
        <button
          type="button"
          onClick={addProduct}
          className="flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-primary-700 transition-colors shadow-sm self-start sm:self-center flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="space-y-6">
        {products.map((product, idx) => (
          <div
            key={product.id}
            style={{ zIndex: products.length - idx }}
            className="border border-brand-border rounded-2xl bg-white p-5 md:p-6 shadow-sm relative hover:border-brand-neutral/20 transition-all duration-200"
          >
            {/* Index badge & Remove button */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/5 px-3 py-1 rounded-full">
                <Box className="w-4 h-4" />
                Product #{idx + 1}
              </div>
              {products.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProduct(product.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-colors"
                  title="Remove product"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              )}
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Product Name" required>
                  <Input
                    placeholder="e.g. Analytics Dashboard"
                    value={product.name}
                    onChange={e => updateProduct(product.id, { name: e.target.value })}
                  />
                </FormField>
                <FormField label="Category">
                  <Input
                    placeholder="e.g. Software, Consulting, Hardware"
                    value={product.category}
                    onChange={e => updateProduct(product.id, { category: e.target.value })}
                  />
                </FormField>
              </div>

              <FormField label="Description">
                <Textarea
                  placeholder="Describe your product value proposition, key features, and target user."
                  rows={2}
                  value={product.description}
                  onChange={e => updateProduct(product.id, { description: e.target.value })}
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="Pricing Model">
                  <SelectDropdown
                    value={product.pricingModel}
                    onChange={v => handlePricingModelChange(product.id, v)}
                    options={pricingModels}
                    placeholder="Select model..."
                    searchable
                  />
                </FormField>

                <FormField label="Price ($)">
                  <Input
                    placeholder="e.g. 49"
                    value={product.price}
                    onChange={e => handlePriceChange(product.id, e.target.value)}
                  />
                </FormField>

                <FormField label="Billing Frequency">
                  <SelectDropdown
                    value={product.frequency}
                    onChange={v => updateProduct(product.id, { frequency: v })}
                    options={frequencies}
                    placeholder="Select frequency..."
                  />
                </FormField>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
