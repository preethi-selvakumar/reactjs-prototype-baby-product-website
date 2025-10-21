import React from 'react';

const Faq = () => {
    return (
        <div className="faq-container-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="faq-heading">FAQ's</h1>
                    </div>
                </div>

                <div className="faq-accordion-container">
                    {/* FAQ Item 1 */}
                    <div className="faq-item-group">
                        <h2 className="faq-question">Where are the offices of BabyZone located?</h2>
                        <div className="faq-item">
                            <p className="faq-answer">
                                Currently our office is located in Madurai while the orders are shipped from our warehouses located across India.
                            </p>
                        </div>
                    </div>

                    {/* FAQ Item 2 */}
                    <div className="faq-item-group">
                        <h2 className="faq-question">How do I know my order has been confirmed?</h2>
                        <div className="faq-item">
                            <p className="faq-answer">
                                After checking out during the payment process, you will get a confirmation that your payment has been processed successfully. You
                                will also get a mail in your registered email id, along with an SMS to your registered mobile number confirming the order.
                            </p>
                        </div>
                    </div>

                    {/* FAQ Item 3 */}
                    <div className="faq-item-group">
                        <h2 className="faq-question">Are there any other hidden charges like Octroi or Entry tax?</h2>
                        <div className="faq-item">
                            <p className="faq-answer">
                                You will get the final price during check out. Our prices are all inclusive and you need not pay anything extra.
                            </p>
                        </div>
                    </div>

                    {/* FAQ Item 4 */}
                    <div className="faq-item-group">
                        <h2 className="faq-question">How long will it take to receive my orders?</h2>
                        <div className="faq-item">
                            <p className="faq-answer">
                                For all areas serviced by reputed couriers, the delivery time would be within 3 to 4 business days after dispatch (business days
                                exclude Sundays and other holidays). However items weighing over 2 kilos may take a couple of days longer to reach. For other
                                areas the products will be shipped through Indian Postal Service and may take 1-2 weeks depending on the location.
                            </p>
                        </div>
                    </div>

                    {/* FAQ Item 5 */}
                    <div className="faq-item-group">
                        <h2 className="faq-question">Will my GST amount be refunded on Order Cancellation and Returns?</h2>
                        <div className="faq-item">
                            <p className="faq-answer">
                                Yes. GST amount collected will be returned to customer's source method at the time of Cancellation and Returns
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;