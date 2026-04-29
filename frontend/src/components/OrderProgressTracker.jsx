import React from 'react';
import { Check, Truck, Package, CreditCard, ShoppingBag, MapPin } from 'lucide-react';

const OrderProgressTracker = ({ currentStatus }) => {
    const steps = [
        { id: 1, name: 'Order Placed', status: ['pending', 'placed', 'order placed'], icon: ShoppingBag },
        { id: 2, name: 'Payment Confirmed', status: ['payment confirmed', 'paid', 'completed'], icon: CreditCard },
        { id: 3, name: 'Processing', status: ['processing', 'preparing'], icon: Package },
        { id: 4, name: 'Shipped', status: ['shipped', 'dispatched', 'in transit'], icon: Truck },
        { id: 5, name: 'Delivered', status: ['delivered'], icon: MapPin },
    ];

    const getCurrentStep = () => {
        const status = currentStatus?.toLowerCase();
        let currentStepIndex = 0;

        // Logic to determine how far along the status is
        if (status === 'delivered') return 4;
        if (status === 'shipped') return 3;
        if (status === 'processing') return 2;
        if (status === 'payment confirmed' || status === 'paid') return 1;
        return 0; // Default to Order Placed
    };

    const activeIndex = getCurrentStep();

    return (
        <div className="progress-tracker">
            <div className="progress-tracker-container">
                {/* Background Line */}
                <div className="progress-line-bg"></div>

                {/* Active Progress Line */}
                <div
                    className="progress-line-active"
                    style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index < activeIndex;
                    const isActive = index === activeIndex;

                    return (
                        <div key={step.id} className="progress-step">
                            <div
                                className={`progress-circle ${isCompleted || isActive ? 'active' : 'inactive'} ${isActive ? 'current' : ''}`}
                            >
                                {isCompleted ? <Check size={24} /> : <Icon size={20} />}
                            </div>
                            <div className="progress-label">
                                <p className={`progress-text ${isCompleted || isActive ? 'completed' : 'pending'}`}>
                                    {step.name}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderProgressTracker;
