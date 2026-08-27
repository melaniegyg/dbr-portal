// ============================================================
// DEFECTS DATA
// Source: Google Sheet tab "CLAUDE MAP" (Defect → Action Mapping)
// https://docs.google.com/spreadsheets/d/1YaM72r6uqwboSD2XWcLAAEAynVUQSXJ1HBU3gerajGQ (gid=2078240139)
// Auto-generated from the CLAUDE MAP CSV export. 8 categories, 42 defects.
//
// Per-defect shape:
//   name                -> DEFECT NAME [Supplier]  (left-rail title)
//   defect              -> DEFECT (internal key; match key vs supplier CSV)
//   description         -> DESCRIPTION (left-rail subtitle)
//   recAction           -> REC ACTION (SUPER), primary action (keys into RA_COPY)
//   recActionConfidence -> REC ACTION CONFIDENCE (High/Medium/"")
//   recommendations     -> GYG Advice bullets ("What you can do")
//   relatedReviews      -> RELATED REVIEWS (controls "See related reviews")
//   faqLinks            -> FAQ LINKS (raw URL or human label strings)
//   pageLinkLabel       -> PAGE LINK CTA label ("Review activity details" etc.)
//   pageLinkUrl         -> destination (decorative for now)
// ============================================================

const DEFECTS_DATA = [
  {
    "category": "Activity not as advertised",
    "categorySupplier": "Experience did not match listing",
    "defects": [
      {
        "name": "Activity not as described",
        "defect": "Activity Not As Advertised",
        "description": "The activity delivered did not match the description.",
        "recAction": "Booking defect - Not as advertised",
        "recActionConfidence": "High",
        "recommendations": [
          "Please review the description of your activity and provide all necessary details so travelers know what to expect",
          "Ensure your photos accurately reflect the experience"
        ],
        "relatedReviews": true,
        "faqLinks": [
          "https://supply.getyourguide.support/hc/en-us/articles/13981009256605-Adding-Description-and-Highlights-for-Your-Product",
          "https://supply.getyourguide.support/hc/en-us/articles/20309268701085-Enhancing-Your-Product-Listings-With-Extra-Information"
        ],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "Duration not as described",
        "defect": "Duration Not As Advertised",
        "description": "The actual duration of the activity differed from what was advertised.",
        "recAction": "Booking defect - Duration not as advertised",
        "recActionConfidence": "High",
        "recommendations": [
          "Update your activity duration to reflect real times",
          "Include buffer time for large groups",
          "Be clear about start and end times"
        ],
        "relatedReviews": true,
        "faqLinks": [],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "Language wrong or hard to understand",
        "defect": "Guide Language Wrong or Low Proficiency",
        "description": "The guide did not speak the language originally booked for.",
        "recAction": "Catalog - Update guide details",
        "recActionConfidence": "Medium",
        "recommendations": [
          "Update languages offered for each activity option"
        ],
        "relatedReviews": true,
        "faqLinks": [],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "Food/drinks poor or not as described",
        "defect": "Food or Drinks Low Quality or Not As Advertised",
        "description": "The food or drinks provided did not match their advertisement in quality or type.",
        "recAction": "Booking defect - Not as advertised",
        "recActionConfidence": "",
        "recommendations": [
          "Review the description of your food and beverage offerings so travelers know what to expect",
          "Ensure the food or beverages which are included in your activity description are offered"
        ],
        "relatedReviews": true,
        "faqLinks": [
          "https://supply.getyourguide.support/hc/en-us/articles/13981009256605-Adding-Description-and-Highlights-for-Your-Product",
          "https://supply.getyourguide.support/hc/en-us/articles/20309268701085-Enhancing-Your-Product-Listings-With-Extra-Information"
        ],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "Attraction or stop was closed",
        "defect": "Attraction Closed",
        "description": "Customers arrived to find the attraction unexpectedly closed.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Clearly list in the \"Know Before You Go\" section any stops, monuments, or attractions that are closed on certain days or during specific hours (e.g., lunch closures, Saturday closures for religious sites).",
          "If some stops on a multi-stop tour are self-guided rather than guided, state this clearly in your activity description so travelers know what's included.",
          "Train guides to proactively inform customers on-site about closures or schedule changes as soon as they're known, rather than leaving them to find out themselves."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "Unsuitable for customers with a disability",
        "defect": "Unsuitable For Disabled Customers",
        "description": "The activity was not accessible for disabled customers.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Clearly state in your activity description and \"Know Before You Go\" section whether the activity is wheelchair-accessible, and specify physical requirements (stairs, walking distance, terrain).",
          "If any add-ons or areas (e.g., lounges, boarding gates) have accessibility limitations, describe them explicitly so customers can plan accordingly.",
          "Train staff on accessibility handoff procedures (e.g., wheelchair drop-off/pickup timing) so customers aren't left waiting or confused."
        ],
        "relatedReviews": true,
        "faqLinks": [],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "No warning about item to bring",
        "defect": "Missing Items To Bring Info",
        "description": "Customers were not informed about essential items to bring for the activity.",
        "recAction": "Booking defect - Missing items",
        "recActionConfidence": "High",
        "recommendations": [
          "List everything customers should bring (towel, swimwear, change of clothes, etc.) in the \"Know Before You Go\" section.",
          "Keep this list updated whenever your itinerary changes (e.g., a water-based stop is added).",
          "Reinforce \"what to bring\" in the booking confirmation, not just in the fine print, so customers don't arrive unprepared."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      }
    ]
  },
  {
    "category": "Audio Guide Problems",
    "categorySupplier": "Audioguide problems",
    "defects": [
      {
        "name": "Audioguide was broken",
        "defect": "Audio Guide Broken",
        "description": "The audio guides provided were non-functional or broken.",
        "recAction": "Booking defect - Audio or language",
        "recActionConfidence": "High",
        "recommendations": [
          "Check and test audio guide devices before each activity, and repair or replace any that are broken.",
          "Confirm the audio guide is available in every language listed on your activity page before offering it.",
          "Update your activity's language options in the Portal right away if a language is no longer supported."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Audioguide was missing or not in language promised",
        "defect": "Audio Guide Missing or Not in language promised",
        "description": "Audio guides were either missing or not available in the promised language.",
        "recAction": "Booking defect - Audio or language",
        "recActionConfidence": "High",
        "recommendations": [
          "Check and test audio guide devices before each activity, and repair or replace any that are broken.",
          "Confirm the audio guide is available in every language listed on your activity page before offering it.",
          "Update your activity's language options in the Portal right away if a language is no longer supported."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      }
    ]
  },
  {
    "category": "Communication problems",
    "categorySupplier": "Customer not contacted",
    "defects": [
      {
        "name": "Activity provider did not respond to customer",
        "defect": "Supplier Not Responsive",
        "description": "The supplier was unresponsive to customer contact.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Check the correct email is configured to receive customer questions in the Portal in your Account Management settings.",
          "Check that you have the correct phone number set up for customers to contact you on the day of the activity under: Manage Products > Important Information > Emergency contact number",
          "Use the Messages tab in the Portal to reply to customer questions over email or chat",
          "You should reply within one business day of the customer’s questions"
        ],
        "relatedReviews": false,
        "faqLinks": [
          "https://supply.getyourguide.support/hc/en-us/articles/13981013868445-Contacting-GetYourGuide-customers",
          "https://supply.getyourguide.support/hc/en-us/articles/34781062388637-Messages-in-the-Supplier-Portal"
        ],
        "pageLinkLabel": "Go to messages",
        "pageLinkUrl": ""
      },
      {
        "name": "Activity was changed without warning",
        "defect": "Unexpected Change to Activity",
        "description": "The tour was altered unexpectedly without prior notice to customers. Mentions to cancellation due to weather conditions are not marked as disrupted.",
        "recAction": "Booking defect - Not as advertised",
        "recActionConfidence": "Medium",
        "recommendations": [
          "Avoid making last minute changes to the activity, as it is disruptive to the customer and can lower their satisfaction with the activity.",
          "Try to proactively communicate changes as early as possible (more than 72 hours out).",
          "Use the Messages tab in the Portal to reply to customer questions over email or chat"
        ],
        "relatedReviews": false,
        "faqLinks": [
          "https://supply.getyourguide.support/hc/en-us/articles/13981013868445-Contacting-GetYourGuide-customers",
          "https://supply.getyourguide.support/hc/en-us/articles/34781062388637-Messages-in-the-Supplier-Portal"
        ],
        "pageLinkLabel": "Go to messages",
        "pageLinkUrl": ""
      },
      {
        "name": "Activity was cancelled without warning",
        "defect": "Unexpected Cancellation",
        "description": "The activity was cancelled without prior warning.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Block out dates when you cannot operate as soon as you can.",
          "Review and update your maximum and minimum participants limits.",
          "Set up cut-off times for your product."
        ],
        "relatedReviews": false,
        "faqLinks": [
          "https://supply.getyourguide.support/hc/en-us/articles/26538009743645-Managing-Availability-for-your-product",
          "https://supply.getyourguide.support/hc/en-us/articles/13980997018141-Setting-up-cut-off-times-for-your-product"
        ],
        "pageLinkLabel": "Go to messages",
        "pageLinkUrl": ""
      }
    ]
  },
  {
    "category": "Payment problems",
    "categorySupplier": "Payment problems",
    "defects": [
      {
        "name": "Refund not received by customer",
        "defect": "Refund not received",
        "description": "Customers reporting they still didn't receive their refund.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Payment issue or double charge at checkout",
        "defect": "Payment Issues or Double Charge",
        "description": "Customers encounter payment issues during the checkout process, either stopping them from booking or generating double charges. (reference)",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Unexpected extra charge on the activity",
        "defect": "Extra Charge",
        "description": "Customers were unexpectedly required to pay additional charges on spot.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Include all charges and costs in the price customer pays on GYG."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "Activity was cheaper on the spot",
        "defect": "Lower Price Destination",
        "description": "Customers found that activity was cheaper on destination.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Monitor prices locally and ensure price on GYG is the same."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      }
    ]
  },
  {
    "category": "Meeting point or pickup problems",
    "categorySupplier": "Meeting point or pickup problems",
    "defects": [
      {
        "name": "Unclear meeting point location",
        "defect": "Unclear Meeting Point Location",
        "description": "The description of meeting point for the activity was not clear, or wrong.",
        "recAction": "VizOps - Add meeting point picture",
        "recActionConfidence": "High",
        "recommendations": [
          "Ensure your activity’s meeting point address is clear and up-to-date. If customers copy and paste the address, will they find it?"
        ],
        "relatedReviews": false,
        "faqLinks": [
          "Introducing Meeting Point Pictures: Show Travelers Exactly Where to Meet You"
        ],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "Driver/guide were late or did not show up",
        "defect": "Pickup/Guide Late or No Show",
        "description": "The guide or driver arrived late or did not show up at the meeting / pick up point.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Have drivers/guides arrive 10-15 minutes early",
          "Ensure your pickup point is clear for customers, and add as much detail as possible",
          "Try assigning guides to bookings to help customers find the guide in destination."
        ],
        "relatedReviews": false,
        "faqLinks": [
          "Assigning Guides to Bookings – Supply Partner Help Center | GetYourGuide"
        ],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "Unclear pickup information",
        "defect": "Unclear Pickup Information",
        "description": "Information about pickup location or pickup was not provided, or it has not been confirmed by supplier.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Use our pickup tools in the Portal pick-up planner to share pick-up details directly with customers through ourthrough in our portal (learn more here), including the time and location.",
          "Ensure pick-up information is clear in your activity description",
          "For activities with Pickups, it’s helpful to send two messages to customers:",
          "A message after they book to confirm their booking and set expectations about when they will receive their pickup time (typically the day before the tour starts).",
          "A message 24 hours before the tour starts with the pickup time and other important details (e.g. driver, vehicle number)",
          "In our Portal, you can use our “Message Multiple Customers” feature to send a message the day before the tour with important details, including photograph attachments."
        ],
        "relatedReviews": false,
        "faqLinks": [
          "Managing Pickup Information for Your Bookings – Supply Partner Help Center | GetYourGuide"
        ],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "Pickup time was changed last-minute",
        "defect": "Change Pick Up Time",
        "description": "The pick-up time was changed last minute.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Use our pickup tools in the Portal pick-up planner to share pick-up details directly with customers through ourthrough in our portal (learn more here), including the time and location.",
          "Ensure pick-up information is clear in your activity description",
          "For activities with Pickups, it’s helpful to send two messages to customers:",
          "A message after they book to confirm their booking and set expectations about when they will receive their pickup time (typically the day before the tour starts).",
          "A message 24 hours before the tour starts with the pickup time and other important details (e.g. driver, vehicle number)",
          "In our Portal, you can use our “Message Multiple Customers” feature to send a message the day before the tour with important details, including photograph attachments."
        ],
        "relatedReviews": false,
        "faqLinks": [
          "Managing Pickup Information for Your Bookings – Supply Partner Help Center | GetYourGuide"
        ],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "Pickup location was changed last-minute",
        "defect": "Change Pick Up Location",
        "description": "The pickup location of the activity was changed unexpectedly without prior information to customer.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Use our pickup tools in the Portal pick-up planner to share pick-up details directly with customers through ourthrough in our portal (learn more here), including the time and location.",
          "Ensure pick-up information is clear in your activity description",
          "For activities with Pickups, it’s helpful to send two messages to customers:",
          "A message after they book to confirm their booking and set expectations about when they will receive their pickup time (typically the day before the tour starts).",
          "A message 24 hours before the tour starts with the pickup time and other important details (e.g. driver, vehicle number)",
          "In our Portal, you can use our “Message Multiple Customers” feature to send a message the day before the tour with important details, including photograph attachments."
        ],
        "relatedReviews": false,
        "faqLinks": [
          "Managing Pickup Information for Your Bookings – Supply Partner Help Center | GetYourGuide"
        ],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "Drop-off location was changed last-minute",
        "defect": "Change Drop Off Location",
        "description": "The drop off location of the activity was changed unexpectedly without prior information to customer.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Use our pickup tools in the Portal pick-up planner to share pick-up details directly with customers through ourthrough in our portal (learn more here), including the time and location.",
          "Ensure pick-up information is clear in your activity description",
          "For activities with Pickups, it’s helpful to send two messages to customers:",
          "A message after they book to confirm their booking and set expectations about when they will receive their pickup time (typically the day before the tour starts)",
          "A message 24 hours before the tour starts with the pickup time and other important details (e.g. driver, vehicle number)",
          "In our Portal, you can use our “Message Multiple Customers” feature to send a message the day before the tour with important details, including photograph attachments."
        ],
        "relatedReviews": false,
        "faqLinks": [
          "Managing Pickup Information for Your Bookings – Supply Partner Help Center | GetYourGuide"
        ],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      }
    ]
  },
  {
    "category": "Too many people",
    "categorySupplier": "Too many people",
    "defects": [
      {
        "name": "Activity was full/overbooked and customer could not join",
        "defect": "Activity Oversubscribed",
        "description": "The activity was overbooked and customer didn't have access to it.",
        "recAction": "Booking defect - Activity overcrowded",
        "recActionConfidence": "High",
        "recommendations": [
          "Set and enforce accurate capacity limits for your activity, and never exceed them regardless of demand.",
          "Keep your availability and booking calendar up to date in the Portal so it reflects real-time capacity.",
          "If a booking can't be honored due to overbooking, notify the customer as early as possible and offer an alternative or refund."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "Go to Availability",
        "pageLinkUrl": ""
      },
      {
        "name": "Activity provider made the activity too crowded",
        "defect": "Too Crowded",
        "description": "The activity was significantly more crowded than expected, and this overcrowding was a result of the activity provider's actions, such as exceeding capacity limits on a boat.",
        "recAction": "Booking defect - Activity overcrowded",
        "recActionConfidence": "High",
        "recommendations": [
          "Set and enforce accurate capacity limits for your activity, and never exceed them regardless of demand.",
          "Keep your availability and booking calendar up to date in the Portal so it reflects real-time capacity.",
          "If a booking can't be honored due to overbooking, notify the customer as early as possible and offer an alternative or refund."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "Go to Availability",
        "pageLinkUrl": ""
      }
    ]
  },
  {
    "category": "Trust & Safety Problems",
    "categorySupplier": "Trust and safety problems",
    "defects": [
      {
        "name": "Customer suffered accident or injury",
        "defect": "Accident Injury",
        "description": "Customers suffered accidents or injuries during the activity.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Vet and train staff/guides on professional, respectful conduct, with zero tolerance for abusive, discriminatory, or unsafe behavior.",
          "Keep vehicles, equipment, and venues well-maintained and inspected before each activity.",
          "Report any safety incident, misconduct, or suspected fraud to GetYourGuide and local authorities immediately."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Customer faced aggressive or abusive behavior",
        "defect": "Aggressive Abusive Behaviour",
        "description": "Customers faced aggressive or abusive behavior from staff or other participants.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Vet and train staff/guides on professional, respectful conduct, with zero tolerance for abusive, discriminatory, or unsafe behavior.",
          "Keep vehicles, equipment, and venues well-maintained and inspected before each activity.",
          "Report any safety incident, misconduct, or suspected fraud to GetYourGuide and local authorities immediately."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Customer was assaulted or robbed",
        "defect": "Assault Robbery",
        "description": "Customers were subjected to assault or robbery during the activity.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Vet and train staff/guides on professional, respectful conduct, with zero tolerance for abusive, discriminatory, or unsafe behavior.",
          "Keep vehicles, equipment, and venues well-maintained and inspected before each activity.",
          "Report any safety incident, misconduct, or suspected fraud to GetYourGuide and local authorities immediately."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Customer's belongings were damaged",
        "defect": "Damage To Belongings",
        "description": "Customers' belongings were damaged during the activity due to poor handling or negligence.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Vet and train staff/guides on professional, respectful conduct, with zero tolerance for abusive, discriminatory, or unsafe behavior.",
          "Keep vehicles, equipment, and venues well-maintained and inspected before each activity.",
          "Report any safety incident, misconduct, or suspected fraud to GetYourGuide and local authorities immediately."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Customer faced discriminatory behavior",
        "defect": "Discriminating Behavior",
        "description": "Customers experienced discriminatory behavior during the activity.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Vet and train staff/guides on professional, respectful conduct, with zero tolerance for abusive, discriminatory, or unsafe behavior.",
          "Keep vehicles, equipment, and venues well-maintained and inspected before each activity.",
          "Report any safety incident, misconduct, or suspected fraud to GetYourGuide and local authorities immediately."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Customer faced reckless behavior",
        "defect": "Reckless Behavior",
        "description": "Reckless behavior by staff or participants compromised the safety of the activity.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Vet and train staff/guides on professional, respectful conduct, with zero tolerance for abusive, discriminatory, or unsafe behavior.",
          "Keep vehicles, equipment, and venues well-maintained and inspected before each activity.",
          "Report any safety incident, misconduct, or suspected fraud to GetYourGuide and local authorities immediately."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Safety equipment was not provided",
        "defect": "Safety Equipment Not Available",
        "description": "Necessary safety equipment was not provided, putting participants at risk.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Vet and train staff/guides on professional, respectful conduct, with zero tolerance for abusive, discriminatory, or unsafe behavior.",
          "Keep vehicles, equipment, and venues well-maintained and inspected before each activity.",
          "Report any safety incident, misconduct, or suspected fraud to GetYourGuide and local authorities immediately."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Customer experienced sexual harassment or misconduct",
        "defect": "Sexual Harassment Misconduct",
        "description": "Customers experienced sexual harassment or misconduct during the activity.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Vet and train staff/guides on professional, respectful conduct, with zero tolerance for abusive, discriminatory, or unsafe behavior.",
          "Keep vehicles, equipment, and venues well-maintained and inspected before each activity.",
          "Report any safety incident, misconduct, or suspected fraud to GetYourGuide and local authorities immediately."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Driving was reckless and unsafe",
        "defect": "Unsafe Driving",
        "description": "The driving during the activity was reckless and felt unsafe.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Vet and train staff/guides on professional, respectful conduct, with zero tolerance for abusive, discriminatory, or unsafe behavior.",
          "Keep vehicles, equipment, and venues well-maintained and inspected before each activity.",
          "Report any safety incident, misconduct, or suspected fraud to GetYourGuide and local authorities immediately."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Environment/setting was hazardous or unsafe",
        "defect": "Unsafe Environment",
        "description": "The environment during the activity felt unsafe or hazardous.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Vet and train staff/guides on professional, respectful conduct, with zero tolerance for abusive, discriminatory, or unsafe behavior.",
          "Keep vehicles, equipment, and venues well-maintained and inspected before each activity.",
          "Report any safety incident, misconduct, or suspected fraud to GetYourGuide and local authorities immediately."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Transportation broke down",
        "defect": "Transport Breakdown",
        "description": "The transportation used during the activity broke down.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Vet and train staff/guides on professional, respectful conduct, with zero tolerance for abusive, discriminatory, or unsafe behavior.",
          "Keep vehicles, equipment, and venues well-maintained and inspected before each activity.",
          "Report any safety incident, misconduct, or suspected fraud to GetYourGuide and local authorities immediately."
        ],
        "relatedReviews": true,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Transportation was unclean or poor-quality",
        "defect": "Transport Low Quality",
        "description": "The transportation provided was unclean and poorly maintained.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Vet and train staff/guides on professional, respectful conduct, with zero tolerance for abusive, discriminatory, or unsafe behavior.",
          "Keep vehicles, equipment, and venues well-maintained and inspected before each activity.",
          "Report any safety incident, misconduct, or suspected fraud to GetYourGuide and local authorities immediately."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      },
      {
        "name": "Customers scammed or perceived the activity as fraudulent",
        "defect": "Scam Fraud",
        "description": "Customers were deceived by fraudulent activities, or perceived the experience as fraudulent.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Vet and train staff/guides on professional, respectful conduct, with zero tolerance for abusive, discriminatory, or unsafe behavior.",
          "Keep vehicles, equipment, and venues well-maintained and inspected before each activity.",
          "Report any safety incident, misconduct, or suspected fraud to GetYourGuide and local authorities immediately."
        ],
        "relatedReviews": false,
        "faqLinks": [],
        "pageLinkLabel": "",
        "pageLinkUrl": ""
      }
    ]
  },
  {
    "category": "Voucher problems",
    "categorySupplier": "Ticket problems",
    "defects": [
      {
        "name": "How to collect tickets/voucher was unclear or not provided",
        "defect": "Unclear Ticket Collection",
        "description": "Information about how and where customers need to collect their tickets was not provided or it's not clear.",
        "recAction": "VizOps - Add meeting point picture",
        "recActionConfidence": "Medium",
        "recommendations": [
          "Add clear ticket collection instructions to the “Important Information\" section of your activity in the Portal.",
          "Ensure ticket collection location is easy to find",
          "Add a Meeting Point photograph to help customers know where to go."
        ],
        "relatedReviews": false,
        "faqLinks": [
          "https://supply.getyourguide.support/hc/en-us/articles/34904875609245-Understanding-Ticket-Configurations-How-Customers-Receive-Their-Booking-Confirmation",
          "https://www.getyourguide.supply/articles/introducing-meeting-point-pictures-show-travelers-exactly-where-to-meet-you"
        ],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "Customer did not receive confirmation of booking",
        "defect": "Confirmation Not Received",
        "description": "Customers did not receive confirmation of their booking, leading to uncertainty.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Clearly state how customers can access the activity in the “Know Before You Go” section",
          "Clearly outline what is included and what is not included on your activity page, ensuring there are no hidden costs.",
          "Let GetYourGuide send tickets directly to customers after booking, instead of requiring voucher exchange or manual ticket sending.",
          "For booking approval and ticket delivery related changes, please contact Supplier Support team or your Account Manager for support"
        ],
        "relatedReviews": false,
        "faqLinks": [
          "https://supply.getyourguide.support/hc/en-us/articles/34904875609245-Understanding-Ticket-Configurations-How-Customers-Receive-Their-Booking-Confirmation"
        ],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "Skip-the-line access was not provided",
        "defect": "No Skip The Line",
        "description": "The skip-the-line access was not provided, or customer had to wait in queue.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "In the Portal, update your activity description to the correct \"Skip the line\" configuration. This will help set more clear expectations with customers about how they will start the activity."
        ],
        "relatedReviews": false,
        "faqLinks": [
          "https://supply.getyourguide.support/hc/en-us/articles/13980970033821-Uploading-options"
        ],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "Ticket was not needed to enter the attraction/spot",
        "defect": "No Ticket Needed",
        "description": "Customers were misled into believing tickets were necessary when they were not.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Clearly state how customers can access the activity in the “Know Before You Go” section",
          "Clearly outline what is included and what is not included on your activity page, ensuring there are no hidden costs.",
          "Let GetYourGuide send tickets directly to customers after booking, instead of requiring voucher exchange or manual ticket sending.",
          "For booking approval and ticket delivery related changes, please contact Supplier Support team or your Account Manager for support"
        ],
        "relatedReviews": false,
        "faqLinks": [
          "https://supply.getyourguide.support/hc/en-us/articles/34904875609245-Understanding-Ticket-Configurations-How-Customers-Receive-Their-Booking-Confirmation"
        ],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      },
      {
        "name": "GetYourGuide ticket was not accepted by activity provider",
        "defect": "Voucher Not Accepted",
        "description": "GetYourGuide vouchers were not accepted by activity provider.",
        "recAction": "",
        "recActionConfidence": "",
        "recommendations": [
          "Clearly state in the “Know Before You Go” section that customers need to complete an exchange to access your activity",
          "Explain where customers need to go exchange their voucher for a ticket"
        ],
        "relatedReviews": false,
        "faqLinks": [
          "https://supply.getyourguide.support/hc/en-us/articles/34904875609245-Understanding-Ticket-Configurations-How-Customers-Receive-Their-Booking-Confirmation"
        ],
        "pageLinkLabel": "Review activity details",
        "pageLinkUrl": ""
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DEFECTS_DATA };
}
