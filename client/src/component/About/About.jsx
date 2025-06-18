import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div style={{ background: "#f8f9fa", padding: "50px 20px" }}>
      <div className="container">
        {/* Owner Section First */}
        <div
          className="row bg-white shadow rounded-4 p-4 p-md-5 mb-5"
          style={{
            background: "linear-gradient(to right, #ffffff, #f0f4f8)",
            minHeight: "400px",
            alignItems: "stretch",
          }}
        >
          {/* Left: Owner Info */}
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <div>
              <h2 className="fw-bold text-dark">Meet Our Founder</h2>
              <h4 className="text-primary fw-semibold mb-3">Ali Khan</h4>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#555",
                  lineHeight: "1.7",
                }}
              >
                Ali Khan, the visionary behind <strong>MobileShop</strong>, has
                over 10 years of experience in the mobile retail industry. With
                a passion for technology and a deep understanding of customer
                needs, he founded MobileShop to make premium smartphones more
                accessible, affordable, and reliable for everyone. His mission
                is to build a store where trust and quality go hand in hand. His
                leadership ensures that MobileShop remains ahead of trends,
                offering only the best to customers.
              </p>
            </div>
          </div>

          {/* Right: Owner Image */}
          <div className="col-md-6 d-flex align-items-stretch">
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                border: "6px solid #0d6efd33",
                borderRadius: "12px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              }}
            >
           <img
  src="/images/ak.jpg"
  alt="Owner"
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }}
/>


            </div>
          </div>
        </div>

        {/* About MobileShop Section */}
        <div className="bg-white p-4 p-md-5 shadow rounded-4 mb-5">
          <h1 className="text-center mb-3 fw-bold">
            About <span className="text-primary">MobileShop</span>
          </h1>
          <p className="lead text-center text-muted mb-4">
            Your one-stop destination for the latest smartphones, unbeatable
            discounts, and top-tier customer service.
          </p>

          <p
            style={{
              lineHeight: "1.8",
              fontSize: "1.05rem",
              textAlign: "justify",
              color: "#444",
            }}
          >
            MobileShop has been at the forefront of mobile retail since its
            inception. Established with a vision to provide the best mobile
            experience to customers across all budgets, we have grown from a
            small local store to a widely trusted name in the smartphone
            industry. At MobileShop, we believe that technology should be
            accessible, affordable, and reliable. That's why we bring you the
            latest smartphones from top brands like Apple, Samsung, Xiaomi,
            Oppo, Vivo, and more — all under one roof.
            <br />
            <br />
            Whether you're a tech enthusiast looking for cutting-edge devices or
            a budget-conscious buyer seeking the best value for money, we have
            something for everyone. Our store is designed to cater to a wide
            range of customers, offering multiple categories of devices,
            including flagship models, mid-range powerhouses, and entry-level
            phones that are big on features but small on price.
            <br />
            <br />
            We believe in more than just selling — we believe in educating. Our
            staff and online platform guide you to choose what fits best for
            your lifestyle. We also make sure you never miss a deal. With
            ongoing promotions, seasonal discounts, bundle offers, and loyalty
            rewards, we always strive to give you more for less.
            <br />
            <br />
            From fast deliveries to expert support, every aspect of our service
            is designed to put you first. We understand the importance of trust
            in online shopping, which is why we ensure transparency,
            authenticity, and security at every step. Our payment gateways are
            secure, your data is protected, and our reviews are genuine.
            <br />
            <br />
            We don’t just stop at phones — we offer a wide range of accessories
            including chargers, earphones, cases, screen protectors, and more.
            Plus, with options like cash on delivery, installment plans (EMI),
            and warranty coverage, we offer flexibility and peace of mind for
            every buyer.
            <br />
            <br />
            Our customer support is available through multiple channels, whether
            you prefer calling, messaging, or visiting our store. Our team is
            friendly, trained, and ready to assist you with pre-sale and
            post-sale service, returns, replacements, or just good advice.
            <br />
            <br />
            We are proud to have served thousands of customers who return to us
            for their mobile needs. Their loyalty is a reflection of our
            commitment to quality, care, and honest business.
            <br />
            <br />
            In the future, MobileShop aims to expand its offerings, introduce
            new brands, and become a full-service tech destination. We’re
            exploring more options like tablets, smartwatches, and gadgets to
            ensure our users get everything in one place.
            <br />
            <br />
            Thank you for making us a part of your digital journey. We invite
            you to explore our products, visit our store, and experience why
            <strong> MobileShop is the smart way to stay connected.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
