// config/doctorsData.ts

export const doctorsData = [
    {
      id: '1',
      name: 'Dr. Sarah',
      specialty: 'Cardiologist',
      hospitalName: 'Apollo Hospital',
      hospitalAddress: '123 Healthcare Blvd, Medical City',
      rating: 4.8,
      reviewCount: 124, 
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 10 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.',
      experience: '10+ years',
      education: 'MD from Johns Hopkins University',
      languages: ['English', 'Spanish'],
      availableSlots: ['Mon 9AM-12PM', 'Wed 1PM-5PM', 'Fri 10AM-3PM'],
    },
    {
      id: '2',
      name: 'Dr. Raj Kumar',
      specialty: 'Orthopedic',
      hospitalName: 'Fortis Hospital',
      hospitalAddress: '456 Bone Street, Joint City',
      rating: 4.9,
      reviewCount: 95,
      image: 'https://images.pexels.com/photos/4989135/pexels-photo-4989135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      about: 'Dr. Raj Kumar is an orthopedic surgeon specializing in sports medicine and joint replacement. With his expertise in minimally invasive procedures, he helps patients recover faster with less pain.',
      experience: '12+ years',
      education: 'MBBS, MS Orthopedics from AIIMS',
      languages: ['English', 'Hindi', 'Punjabi'],
      availableSlots: ['Tue 8AM-1PM', 'Thu 2PM-6PM', 'Sat 9AM-12PM'],
    },
    {
      id: '3',
      name: 'Dr. Emily Chen',
      specialty: 'Dermatologist',
      hospitalName: 'ClearSkin Clinic',
      hospitalAddress: '789 Glow Avenue, Beauty Heights',
      rating: 4.7,
      reviewCount: 108,
      image: 'https://randomuser.me/api/portraits/women/33.jpg',
      about: 'Dr. Emily Chen is a renowned dermatologist specializing in cosmetic and medical dermatology. She is known for her personalized approach to skin care and treatment of complex skin conditions.',
      experience: '8+ years',
      education: 'MD Dermatology from Stanford University',
      languages: ['English', 'Mandarin'],
      availableSlots: ['Mon 2PM-6PM', 'Wed 9AM-1PM', 'Fri 10AM-4PM'],
    },
    {
      id: '4',
      name: 'Dr. Michael Brown',
      specialty: 'Pediatrician',
      hospitalName: 'Children\'s Wellness Center',
      hospitalAddress: '101 Kid Lane, Family District',
      rating: 4.9,
      reviewCount: 156,
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      about: 'Dr. Michael Brown is a compassionate pediatrician with a special interest in child development and adolescent medicine. Parents appreciate his gentle approach and ability to connect with children of all ages.',
      experience: '15+ years',
      education: 'MD Pediatrics from Yale University',
      languages: ['English', 'French'],
      availableSlots: ['Mon 8AM-12PM', 'Wed 1PM-5PM', 'Thu 9AM-3PM'],
    },
    {
      id: '5',
      name: 'Dr. Anita Patel',
      specialty: 'Neurologist',
      hospitalName: 'BrainCare Institute',
      hospitalAddress: '222 Nerve Street, Mindful City',
      rating: 4.8,
      reviewCount: 89,
      image: 'https://randomuser.me/api/portraits/women/67.jpg',
      about: 'Dr. Anita Patel is a neurologist who specializes in headache disorders, epilepsy, and multiple sclerosis. She takes a holistic approach to treatment, focusing on both medication and lifestyle changes.',
      experience: '11+ years',
      education: 'MD Neurology from Harvard Medical School',
      languages: ['English', 'Gujarati', 'Hindi'],
      availableSlots: ['Tue 9AM-2PM', 'Thu 1PM-5PM', 'Sat 10AM-1PM'],
    }
  ];
  
  export const getAllDoctors = () => {
    return doctorsData;
  };
  
  export const getDoctorById = (id) => {
    return doctorsData.find(doctor => doctor.id === id);
  };