export const welcomeApis = {
  getWelcome: async (token: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/welcome", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();
      return response;
    } catch (error: any) {
      console.error("Error fetching welcome data:", error);
      return { message: error.message };
    }
  },
};
