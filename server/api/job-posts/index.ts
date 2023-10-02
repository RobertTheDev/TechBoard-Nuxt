export default defineEventHandler((event) => {
  const { method } = event.node.req;

  if (method === "GET") {
    try {
      return {
        success: true,
        data: [{ title: "Designer" }],
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
});
