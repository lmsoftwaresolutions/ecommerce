from uuid import UUID
from typing import List, Optional

from sqlalchemy.orm import Session

from app.models import Product
from app.schemas import ProductCreate, ProductUpdate


def get_all_products(db: Session) -> List[Product]:
    """Retrieve all products."""
    return db.query(Product).all()


def get_product_by_id(db: Session, product_id: UUID) -> Product:
    """Retrieve a product by ID or raise 404."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found")
    return product


def create_product(db: Session, product_data: ProductCreate) -> Product:
    """Create a new product."""
    product = Product(
        name=product_data.name,
        description=product_data.description,
        price=product_data.price,
        stock=product_data.stock,
        images=product_data.images,
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def update_product(db: Session, product_id: UUID, product_data: ProductUpdate) -> Product:
    """Update a product with provided fields."""
    product = get_product_by_id(db, product_id)
    
    # Update only provided fields
    if product_data.name is not None:
        product.name = product_data.name
    if product_data.description is not None:
        product.description = product_data.description
    if product_data.price is not None:
        product.price = product_data.price
    if product_data.stock is not None:
        product.stock = product_data.stock
    if product_data.images is not None:
        product.images = product_data.images
    
    db.commit()
    db.refresh(product)
    return product


def delete_product(db: Session, product_id: UUID) -> None:
    """Delete a product."""
    product = get_product_by_id(db, product_id)
    db.delete(product)
    db.commit()
