import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div>
      {/* About Section */}
      <div className="container my-5">
        <div className="bg-white p-4 p-md-5 shadow rounded-4">
          <h1 className="text-center mb-3 fw-bold">
            About <span className="text-primary">MobileShop</span>
          </h1>
          <p className="lead text-center text-muted mb-4">
            Your one-stop destination for the latest smartphones, unbeatable discounts, and top-tier customer service.
          </p>

          <p style={{ lineHeight: "1.8", fontSize: "1.05rem", textAlign: "justify" }}>
            MobileShop has been at the forefront of mobile retail since its inception. Established with a vision to
            provide the best mobile experience to customers across all budgets, we have grown from a small local store
            to a widely trusted name in the smartphone industry. At MobileShop, we believe that technology should be
            accessible, affordable, and reliable. That's why we bring you the latest smartphones from top brands like
            Apple, Samsung, Xiaomi, Oppo, Vivo, and more — all under one roof. Whether you're a tech enthusiast looking
            for cutting-edge devices or a budget-conscious buyer seeking the best value for money, we have something
            for everyone.
            <br /><br />
            Our mission is not just to sell phones, but to build relationships. Our dedicated customer service team
            ensures you receive expert advice, transparent pricing, and fast support every step of the way. From
            flagship models to mid-range and budget smartphones, we offer seasonal discounts, bundle offers, and
            exchange programs that keep your mobile lifestyle up to date and affordable.
            <br /><br />
            We also offer accessories, screen protection, warranty services, and EMI options to make your purchase
            smoother and safer. Whether you’re visiting our physical store or shopping online, you can count on a
            seamless experience with detailed product descriptions, honest reviews, and secure checkout.
            <br /><br />
            Over the years, thousands of satisfied customers have made MobileShop their trusted choice. With competitive
            prices, original products, and a passion for excellence, we continue to redefine the way people shop for
            smartphones.
            <br /><br />
            Our values revolve around integrity, innovation, and customer satisfaction. That’s why we’re constantly
            updating our inventory, introducing new brands, and ensuring that every device we offer goes through a
            quality check process. When you shop at MobileShop, you're not just buying a phone — you're investing in
            peace of mind.
            <br /><br />
            Thank you for making us a part of your digital journey. We invite you to explore our products, visit our
            store, and experience why MobileShop is the smart way to stay connected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
