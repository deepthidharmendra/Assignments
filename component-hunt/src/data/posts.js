const posts = [
  {
    id: 1,
    user: 'john_doe',
    avatar: '👨',
    image: '🏔️',
    caption: 'Adventures in the mountains! The view from the top was absolutely breathtaking 🌄',
    likes: 1243,
    time: '2 hours ago',
    comments: [
      { user: 'jane_smith', text: 'Wow, stunning view!' },
      { user: 'travel_vibes', text: 'I need to visit this place!' },
    ],
  },
  {
    id: 2,
    user: 'foodie_life',
    avatar: '👩',
    image: '🍕',
    caption: 'Pizza night with the squad 🍕❤️ Nothing beats homemade!',
    likes: 892,
    time: '4 hours ago',
    comments: [
      { user: 'hungry_always', text: 'This looks SO good 😍' },
      { user: 'chef_mario', text: 'Perfect crust!' },
    ],
  },
  {
    id: 3,
    user: 'dev_life',
    avatar: '🧑',
    image: '💻',
    caption: 'Shipping new features at midnight. The grind never stops 💪 #coding #developer',
    likes: 567,
    time: '6 hours ago',
    comments: [
      { user: 'code_wizard', text: 'Respect the grind! 🔥' },
      { user: 'night_owl', text: 'Same here bro 😅' },
    ],
  },
]

export const stories = [
  { id: 1, user: 'your_story', avatar: '😊', isYou: true },
  { id: 2, user: 'alex_99', avatar: '🧢' },
  { id: 3, user: 'sara_k', avatar: '🎨' },
  { id: 4, user: 'mike_v', avatar: '🎸' },
  { id: 5, user: 'priya_r', avatar: '📸' },
  { id: 6, user: 'tom_x', avatar: '🏋️' },
  { id: 7, user: 'zoe_w', avatar: '🌸' },
]

export default posts