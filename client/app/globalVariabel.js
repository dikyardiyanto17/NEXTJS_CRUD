export const baseUrl = "http://localhost:3000/"

export const dateFormat = (date) => {
	// Check if 'date' is a valid Date object
    // Ensure 'date' is a valid Date object
    const validDate = new Date(date);

    // Format the date using the specified options
    return validDate.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: 'numeric',
      hour12: true,
    })
}
