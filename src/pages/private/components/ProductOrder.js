import React from "react";
import PropTypes from "prop-types";

const ProductOrder = ({ data }) => {
  return data?.products.map((product) => {
    return (
      <div className="flex items-center justify-between" key={product?._id}>
        <div className="flex items-center">
          <figure className="w-[80xp] h-[80px]">
            <img
              src={
                product?.thumb?.url ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQTqcQNiYdz_AaJdYoF2r0eQe7nfb7DGaFgo8PMHpf&s"
              }
              alt={product?.title}
            />
          </figure>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg max-sm:text-sm">{product}</h3>
          </div>
        </div>
      </div>
    );
  });
};

ProductOrder.propTypes = {};

export default ProductOrder;
