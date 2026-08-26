// ============================================================
// DEFECTS DATA
// Source: Google Sheet tab "DEFECTS - for claude"
// https://docs.google.com/spreadsheets/d/1YaM72r6uqwboSD2XWcLAAEAynVUQSXJ1HBU3gerajGQ
//
// Shape:
//   category        -> card header title
//   defects[].name  -> left-rail defect title (DEFECT NAME [Supplier])
//   defects[].description -> left-rail subtitle / detail (DESCRIPTION)
//   defects[].recAction   -> internal SUPER rec-action mapping (not rendered)
//   defects[].recommendations -> "What you can do" bullets (RECOMMENDATION)
//   defects[].faqLinks    -> raw FAQ URLs; labels derived at render time (FAQ LINKS)
// ============================================================

const DEFECTS_DATA = [
  {
    category: "Activity not as advertised",
    defects: [
      {
        name: "Activity not as described",
        description: "The activity delivered did not match the description.",
        recAction: "Booking defect - Not as advertised",
        recommendations: [],
        faqLinks: [
          "https://supply.getyourguide.support/hc/en-us/articles/13981009256605-Adding-Description-and-Highlights-for-Your-Product",
          "https://supply.getyourguide.support/hc/en-us/articles/20309268701085-Enhancing-Your-Product-Listings-With-Extra-Information",
        ],
      },
      {
        name: "Duration not as described",
        description: "The actual duration of the activity differed from what was advertised.",
        recAction: "Booking defect - Duration not as advertised",
        recommendations: [],
        faqLinks: [],
      },
      {
        name: "Language wrong or hard to understand",
        description: "The guide did not speak the language originally booked for.",
        recAction: "Catalog - Update guide details",
        recommendations: [],
        faqLinks: [],
      },
      {
        name: "Food/drinks poor or not as described",
        description: "The food or drinks provided did not match their advertisement in quality or type.",
        recAction: "Booking defect - Not as advertised",
        recommendations: [],
        faqLinks: [
          "https://supply.getyourguide.support/hc/en-us/articles/13981009256605-Adding-Description-and-Highlights-for-Your-Product",
        ],
      },
    ],
  },
  {
    category: "Attraction Closed",
    defects: [
      {
        name: "Attraction or stop was closed",
        description: "Customers arrived to find the attraction unexpectedly closed.",
        recAction: "",
        recommendations: [],
        faqLinks: [],
      },
    ],
  },
  {
    category: "Audio Guide Problems",
    defects: [
      {
        name: "Audioguide was broken",
        description: "The audio guides provided were non-functional or broken.",
        recAction: "Booking defect - Audio or language",
        recommendations: [],
        faqLinks: [],
      },
      {
        name: "Audioguide was missing or not in language promised",
        description: "Audio guides were either missing or not available in the promised language.",
        recAction: "Booking defect - Audio or language",
        recommendations: [],
        faqLinks: [],
      },
    ],
  },
  {
    category: "Communication problems",
    defects: [
      {
        name: "Activity provider did not respond to customer",
        description: "The supplier was unresponsive to customer contact.",
        recAction: "",
        recommendations: [
          "Check the correct email is configured to receive customer questions in the Portal (Manage Products › Important Information › Emergency contact number).",
          "Use the Messages tab in the Portal to reply to customer questions over email or chat.",
          "Reply within one business day of the customer’s questions.",
        ],
        faqLinks: [
          "https://supply.getyourguide.support/hc/en-us/articles/13981013868445-Contacting-GetYourGuide-customers",
          "https://supply.getyourguide.support/hc/en-us/articles/34781062388637-Messages-in-the-Supplier-Portal",
        ],
      },
      {
        name: "Activity was changed without warning",
        description: "The tour was altered unexpectedly without prior notice to customers. Mentions to cancellation due to weather conditions are not marked as a defective booking.",
        recAction: "Booking defect - Not as advertised",
        recommendations: [],
        faqLinks: [],
      },
      {
        name: "Activity was cancelled without warning",
        description: "The activity was cancelled without prior warning.",
        recAction: "",
        recommendations: [],
        faqLinks: [],
      },
    ],
  },
  {
    category: "Missing Items to Bring Info",
    defects: [
      {
        name: "No warning about item to bring",
        description: "Customers were not informed about essential items to bring for the activity.",
        recAction: "Booking defect - Missing items",
        recommendations: [],
        faqLinks: [],
      },
    ],
  },
  {
    category: "Payment problems",
    defects: [
      {
        name: "Refund not received by customer",
        description: "Customers reporting they still didn’t receive their refund.",
        recAction: "",
        recommendations: [],
        faqLinks: [],
      },
      {
        name: "Payment issue or double charge at checkout",
        description: "Customers encounter payment issues during the checkout process, either stopping them from booking or generating double charges.",
        recAction: "",
        recommendations: [],
        faqLinks: [],
      },
      {
        name: "Unexpected extra charge on the activity",
        description: "Customers were unexpectedly required to pay additional charges on the spot.",
        recAction: "",
        recommendations: [
          "Include all charges and costs in the price the customer pays on GetYourGuide.",
        ],
        faqLinks: [],
      },
      {
        name: "Activity was cheaper on the spot",
        description: "Customers found that the activity was cheaper at the destination.",
        recAction: "",
        recommendations: [
          "Monitor prices locally and ensure the price on GetYourGuide is the same.",
        ],
        faqLinks: [],
      },
    ],
  },
  {
    category: "Meeting point problems",
    defects: [
      {
        name: "Unclear meeting point location",
        description: "The description of the meeting point for the activity was not clear, or wrong.",
        recAction: "Add meeting point picture",
        recommendations: [
          "Ensure your activity’s meeting point address is clear and up-to-date. If customers copy and paste the address, will they find it?",
        ],
        faqLinks: [
          "https://www.getyourguide.supply/articles/introducing-meeting-point-pictures-show-travelers-exactly-where-to-meet-you",
        ],
      },
    ],
  },
  {
    category: "Pickup Problems",
    defects: [
      {
        name: "Driver/guide were late or did not show up",
        description: "The guide or driver arrived late or did not show up at the meeting / pick-up point.",
        recAction: "",
        recommendations: [
          "Have drivers/guides arrive 10–15 minutes early.",
          "Check your meeting point is clear for customers, and add as much detail as possible.",
          "Try assigning guides to bookings to help customers find the guide in destination.",
        ],
        faqLinks: [
          "https://supply.getyourguide.support/hc/en-us/articles/31227999459741-Assigning-Guides-to-Bookings",
        ],
      },
      {
        name: "Unclear pickup information",
        description: "Information about pickup location or pickup was not provided, or it has not been confirmed by the supplier.",
        recAction: "",
        recommendations: [
          "Use the pick-up planner in the Portal to share pick-up details directly with customers, including the time and location.",
          "Ensure pick-up information is clear in your activity description.",
          "Send a message after booking to confirm and set expectations about when they’ll receive their pickup time (typically the day before the tour).",
          "Send a message 24 hours before the tour with the pickup time and other important details (e.g. driver, vehicle number).",
          "Use the “Message Multiple Customers” feature to send the day-before message with important details, including photo attachments.",
        ],
        faqLinks: [
          "https://supply.getyourguide.support/hc/en-us/articles/26538099419549-Managing-Pickup-Information-for-Your-Bookings",
        ],
      },
      {
        name: "Pickup time was changed last-minute",
        description: "The pick-up time was changed last minute.",
        recAction: "",
        recommendations: [],
        faqLinks: [],
      },
      {
        name: "Pickup location was changed last-minute",
        description: "The pickup location of the activity was changed unexpectedly without prior information to the customer.",
        recAction: "",
        recommendations: [],
        faqLinks: [],
      },
      {
        name: "Drop-off location was changed last-minute",
        description: "The drop-off location of the activity was changed unexpectedly without prior information to the customer.",
        recAction: "",
        recommendations: [],
        faqLinks: [],
      },
    ],
  },
  {
    category: "Scam Fraud",
    defects: [
      {
        name: "Customers scammed or perceived the activity as fraudulent",
        description: "Customers were deceived by fraudulent activities, or perceived the experience as fraudulent.",
        recAction: "",
        recommendations: [],
        faqLinks: [],
      },
    ],
  },
  {
    category: "Too many people",
    defects: [
      {
        name: "Activity was full/overbooked and customer could not join",
        description: "The activity was overbooked and the customer didn’t have access to it.",
        recAction: "Booking defect - Activity overcrowded (oversubscribed)",
        recommendations: [],
        faqLinks: [],
      },
      {
        name: "Activity provider made the activity too crowded",
        description: "The activity was significantly more crowded than expected, beyond what is typical or acceptable for the setting. This overcrowding was directly attributed to the supplier’s actions, such as exceeding capacity limits (e.g. overcrowding a boat), rather than a predictable aspect of the location.",
        recAction: "Booking defect - Activity overcrowded (oversubscribed)",
        recommendations: [],
        faqLinks: [],
      },
    ],
  },
  {
    category: "Trust & Safety Problems",
    defects: [
      { name: "Customer suffered accident or injury", description: "Customers suffered accidents or injuries during the activity.", recAction: "", recommendations: [], faqLinks: [] },
      { name: "Customer faced aggressive or abusive behavior", description: "Customers faced aggressive or abusive behavior from staff or other participants.", recAction: "", recommendations: [], faqLinks: [] },
      { name: "Customer was assaulted or robbed", description: "Customers were subjected to assault or robbery during the activity.", recAction: "", recommendations: [], faqLinks: [] },
      { name: "Customer's belongings were damaged", description: "Customers’ belongings were damaged during the activity due to poor handling or negligence.", recAction: "", recommendations: [], faqLinks: [] },
      { name: "Customer faced discriminatory behavior", description: "Customers experienced discriminatory behavior during the activity.", recAction: "", recommendations: [], faqLinks: [] },
      { name: "Customer faced reckless behavior", description: "Reckless behavior by staff or participants compromised the safety of the activity.", recAction: "", recommendations: [], faqLinks: [] },
      { name: "Safety equipment was not provided", description: "Necessary safety equipment was not provided, putting participants at risk.", recAction: "", recommendations: [], faqLinks: [] },
      { name: "Customer experienced sexual harassment or misconduct", description: "Customers experienced sexual harassment or misconduct during the activity.", recAction: "", recommendations: [], faqLinks: [] },
      { name: "Driving was reckless and unsafe", description: "The driving during the activity was reckless and felt unsafe.", recAction: "", recommendations: [], faqLinks: [] },
      { name: "Environment/setting was hazardous or unsafe", description: "The environment during the activity felt unsafe or hazardous.", recAction: "", recommendations: [], faqLinks: [] },
      { name: "Transportation broke down", description: "The transportation used during the activity broke down.", recAction: "", recommendations: [], faqLinks: [] },
      { name: "Transportation was unclean or poor-quality", description: "The transportation provided was unclean and poorly maintained.", recAction: "", recommendations: [], faqLinks: [] },
    ],
  },
  {
    category: "Unsuitable for disabled customers",
    defects: [
      {
        name: "Unsuitable for customers with a disability",
        description: "The activity was not accessible for disabled customers.",
        recAction: "",
        recommendations: [],
        faqLinks: [],
      },
    ],
  },
  {
    category: "Voucher problems",
    defects: [
      {
        name: "How to collect tickets/voucher was unclear or not provided",
        description: "Information about how and where customers need to collect their tickets was not provided or is not clear.",
        recAction: "",
        recommendations: [
          "Add clear ticket collection instructions to the “Important Information” section of your activity in the Portal (under “Manage Products”).",
          "Ensure the ticket collection location is easy to find.",
          "Add a Meeting Point photograph to help customers know where to go.",
        ],
        faqLinks: [],
      },
      {
        name: "Customer did not receive confirmation of booking",
        description: "Customers did not receive confirmation of their booking, leading to uncertainty.",
        recAction: "",
        recommendations: [],
        faqLinks: [],
      },
      {
        name: "Skip-the-line access was not provided",
        description: "The skip-the-line access was not provided, or the customer had to wait in the queue.",
        recAction: "",
        recommendations: [],
        faqLinks: [],
      },
      {
        name: "Ticket was not needed to enter the attraction/spot",
        description: "Customers were misled into believing tickets were necessary when they were not.",
        recAction: "",
        recommendations: [],
        faqLinks: [],
      },
      {
        name: "GetYourGuide voucher was not accepted by activity provider",
        description: "GetYourGuide vouchers were not accepted by the activity provider.",
        recAction: "",
        recommendations: [],
        faqLinks: [],
      },
    ],
  },
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DEFECTS_DATA };
}
