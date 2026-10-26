import React, { useState } from 'react';
import clsx from 'clsx';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { CategoryTabs } from '../products/CategoryTabs';
import { ProductCard } from '../products/ProductCard';
import { ProductModal } from '../products/ProductModal';
import { Reveal } from '../ui/Reveal';
import { products } from '../../data/products';
import { content } from '../../data/content';

export function Products({ activeCategory = 'all', onSelectCategory }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleCategoryChange = (categoryId) => {
    setIsFading(true);
    setTimeout(() => {
      if (onSelectCategory) {
        onSelectCategory(categoryId);
      }
      setIsFading(false);
    }, 150);
  };

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="products" className="py-20 sm:py-28 bg-mist border-b border-gold/20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Proprietary Range"
            title={content.products.title}
            subtitle={content.products.subtitle}
          />
        </Reveal>

        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
        />

        {/* Product Cards Grid */}
        <div
          className={clsx(
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-200',
            isFading ? 'opacity-0' : 'opacity-100'
          )}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={handleOpenProduct}
            />
          ))}
        </div>

        {/* Product Details Dialog */}
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </Container>
    </section>
  );
}
