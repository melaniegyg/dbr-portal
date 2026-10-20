// Sample data for the defect-cards module. One entry per category.
// See README.md for the full field reference.
window.SAMPLE_DEFECTS = [
  {
    category: "Activity not as advertised",
    defects: [
      {
        name: "Activity not as described",
        description: "The activity delivered did not match the description.",
        recAction: "Booking defect - Not as advertised", // -> shows a Recommended Action card
        recommendations: [
          "Review the description of your activity and provide all necessary details.",
          "Ensure your photos accurately reflect the experience.",
        ],
        relatedReviews: true,
        faqLinks: [
          "https://supply.getyourguide.support/hc/en-us/articles/13981009256605-Adding-Description-and-Highlights-for-Your-Product",
        ],
        pageLinkLabel: "Review activity details",
        count: 8, // fills {count} in the RA title
      },
      {
        name: "Attraction or stop was closed",
        description: "Customers arrived to find the attraction unexpectedly closed.",
        recAction: "", // no RA -> shows the CTA button row instead
        recommendations: [
          "List any stops or attractions that are closed on certain days in Know Before You Go.",
        ],
        relatedReviews: false,
        faqLinks: [],
        pageLinkLabel: "Review activity details",
      },
    ],
  },
  {
    category: "Meeting point or pickup problems",
    defects: [
      {
        name: "Unclear meeting point location",
        description: "The meeting point description was not clear, or wrong.",
        recAction: "VizOps - Add meeting point picture",
        recommendations: ["Ensure the meeting point address is clear and up to date."],
        relatedReviews: false,
        faqLinks: ["Introducing Meeting Point Pictures"], // plain label (no URL) renders as text
        pageLinkLabel: "Review activity details",
        count: 6,
      },
      {
        name: "Driver/guide were late or did not show up",
        description: "The guide or driver arrived late or did not show up.",
        recAction: "",
        recommendations: [
          "Have drivers/guides arrive 10–15 minutes early.",
          "Try assigning guides to bookings to help customers find them.",
        ],
        relatedReviews: true, // -> "See related reviews" button
        faqLinks: [],
        pageLinkLabel: "",
      },
    ],
  },
];
