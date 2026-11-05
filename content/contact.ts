/** The contact form's topics. `type` is the app's feedback type: messages land
    in the same public.feedback table as Settings › Send feedback. */
export const contactTopics = [
  { value: "support", label: "I need help", type: "bugReport", hint: "What were you doing, and on which device?" },
  { value: "idea", label: "I have an idea", type: "featureRequest", hint: "What would you like ZeroPoint to do?" },
  { value: "partner", label: "Partnerships", type: "other", hint: "Tell us about your range, club, match or brand." },
  { value: "other", label: "Something else", type: "other", hint: "What's on your mind?" },
] as const;

export type ContactTopic = (typeof contactTopics)[number]["value"];
