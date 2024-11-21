import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "../assets/styles/FAQs.css";

function FAQs() {
  return (
    <div className="faqs-container">
      <div className="faqs-header">
        <h1 className="faqs-title">Frequently Asked Questions</h1>
        <p className="faqs-intro">
          Find quick answers to the most commonly asked questions about Harasy Restaurant.
        </p>
      </div>

      <div className="faqs-content">
        {/* Reservation Section */}
        <div className="faqs-category">
          <h2 className="faqs-category-title">Reservation</h2>
          <Accordion className="faqs-accordion">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Can I make reservations in Harasy Restaurant?
              </Accordion.Header>
              <Accordion.Body>
                Yes, you can make reservations at any Harasy Restaurant through our website or by calling the location directly. Advance reservations are recommended, especially during weekends and holidays.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                What is the cancellation policy for reservations?
              </Accordion.Header>
              <Accordion.Body>
                Reservations can be canceled up to 24 hours in advance without a fee. Cancellations within 24 hours may incur a charge depending on the location.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>

        {/* Menu Section */}
        <div className="faqs-category">
          <h2 className="faqs-category-title">Menu</h2>
          <Accordion className="faqs-accordion">
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                Does Harasy Restaurant offer vegan options?
              </Accordion.Header>
              <Accordion.Body>
                Yes, we offer a variety of vegan dishes crafted with the freshest ingredients. You can find these options clearly marked on our menu.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                Can I request customizations to my dish?
              </Accordion.Header>
              <Accordion.Body>
                Absolutely! We strive to accommodate dietary preferences and restrictions. Let your server know, and we’ll do our best to customize your order.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>

        {/* General Section */}
        <div className="faqs-category">
          <h2 className="faqs-category-title">General</h2>
          <Accordion className="faqs-accordion">
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                Does Harasy Restaurant host private events?
              </Accordion.Header>
              <Accordion.Body>
                Yes, we host private events and parties. Contact your nearest location or visit our Events page for more details.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                Do you offer gift cards?
              </Accordion.Header>
              <Accordion.Body>
                Yes, Harasy gift cards are available for purchase online or at any of our restaurant locations.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
