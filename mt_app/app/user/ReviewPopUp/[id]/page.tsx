'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import HospitalReview from '@/components/User/ReviewPopUp/hospitalReview';
import HotelReview from '@/components/User/ReviewPopUp/hotelReview';
import GuideReview from '@/components/User/ReviewPopUp/guideReview';

interface MultiStepReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

const steps = ['guide','hotel','hospital'] as const;
type StepType = typeof steps[number];

const MultiStepReviewModal: React.FC<MultiStepReviewModalProps> = ({ isOpen, onClose, id }) => {
  const [currentStep, setCurrentStep] = useState<StepType>('guide');
  const [isReviewFinished, setIsReviewFinished] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep('guide'); // Reset when closed
      setIsReviewFinished(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else {
      setIsReviewFinished(true);
    }
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 'hospital':
        return <HospitalReview id={id} onSubmitted={handleNext} />;
      case 'hotel':
        return <HotelReview id={id} onSubmitted={handleNext} />;
      case 'guide':
        return <GuideReview id={id} onSubmitted={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/45 z-50">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {isReviewFinished ? (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold text-white">Thank you for your feedback!</h2>
          </div>
        ) : (
          <>
            {renderStepComponent()}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default MultiStepReviewModal;
