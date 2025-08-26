// Utility to check if a time slot is available for booking
// Usage: isTimeSlotAvailable('8-10')

export function isTimeSlotAvailable(timeSlot: string): boolean {
  const bookings = JSON.parse(localStorage.getItem('haviaa_bookings') || '[]');
  // Only consider active bookings
  return !bookings.some((b: any) => b.status === 'active' && b.timeSlot === timeSlot);
}

// Utility to get all available slots from a list
// Usage: getAvailableTimeSlots(['8-10', '10-12', ...])
export function getAvailableTimeSlots(allSlots: string[]): string[] {
  const bookings = JSON.parse(localStorage.getItem('haviaa_bookings') || '[]');
  const bookedSlots = bookings.filter((b: any) => b.status === 'active').map((b: any) => b.timeSlot);
  return allSlots.filter(slot => !bookedSlots.includes(slot));
}
