'use client';

import { useParams, useRouter } from 'next/navigation';

export function useStepNavigator() {
  const router = useRouter();
  const { id } = useParams();
  

  const goToNextStep = () => {
    const steps = JSON.parse(localStorage.getItem('selectedSteps') || '[]');
    let index = parseInt(localStorage.getItem('currentStepIndex') || '0', 10);

    index += 1;

    if (index >= steps.length) {
      router.push(`/user/Form/medical_appointment/${id}`);
    } else {
      localStorage.setItem('currentStepIndex', index.toString());
      router.push(`/user/${steps[index]}/${id}`);
    }
  };

  return goToNextStep;
}
