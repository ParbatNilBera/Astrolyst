export const BASE_URL = "https://astrolyst-backend.onrender.com";
// export const BASE_URL = "http://localhost:8100";

export const API_PATH = {
  AUTH: {
    REGISTER: "api/auth/register", //SignUp
    LOGIN: "api/auth/login-user", //Authenticate user and return JWT token
    GET_PROFILE: "api/auth/profile", //get Logged in User
    LOGIN_ADMIN: "api/auth/login-admin",
    ASTROLOGER_APPLY: "api/auth/astrologer/apply",
    LOGIN_ASTROLOGER: "api/auth/login-astrologer",
  },
  ADMIN: {
    GET_ASTROLOGER_APPLICATIONS: "api/admin/get-applications",
    REJECT_ASTROLOGER: "api/admin/reject-astrologer",
    ACCEPT_ASTROLOGER: "api/admin/approve-astrologer",
  },
  USER: {
    GET_ASTROLOGERS: "/api/user/get-all-astrologers",
    BOOK_APPOINTMENT: "/api/user/book-my-appointment",
    GET_USER: "/api/user/users",
  },
  ASTROLOGER: {
    VIEW_BOOKINGS: "/api/astrologer/bookings",
  },
  COMUNITY: {
    GET_ALL_COMMUNITIES: "/api/comunity/get-communities",
    GET_COMUNITY_BY_ID: (communityId) =>
      `/api/comunity/get-community/${communityId}`,
    COMUNITY_SETTINGS: (communityId) => `/api/comunity/${communityId}/update`,
    CREATE_COMMUNITY: "/api/astrologer/create-community",
    JOIN_COMMUNITY: "/api/comunity/join-comunity",
    ADD_COMUNITY_MEMBERS: "/api/comunity/add-member",
    REMOVE_MEMBER: (communityId, targetUserId) =>
      `/api/comunity/${communityId}/remove/${targetUserId}`,
  },
  POST: {
    GET_POSTS_BY_ID: (communityId) => `/api/post/community/${communityId}`,
    GET_COMUNITY_USER: (communityId) =>
      `/api/comunity/get-all-user/${communityId}`,
    CREATE_POST: `/api/post/upload`,
  },
  CALL: {
    ENABLE_ASTROLOGER: "/api/call/enable",
    DISABLE_ASTROLOGER: "/api/call/disable",
    GET_ACTIVE_ASTROLOGER: "/api/call/get-active-astrologers",
    CALL_ASTROLOGER: "/api/call/call",
    GET_CALLS: "/api/call/calls",
    ACCEPT_CALL: (callId) => `/api/call/accept/${callId}`,
  },
  CHAT: {
    GET_CHAT: "/api/chat", // GET /api/chat/:userId/:astrologerId
    GET_CONVERSATIONS: "/api/chat/conversations", // post /api/chat/conversations/:userId
    SEND: "/api/chat/send", // POST (fallback)
    MARK_READ: "/api/chat/mark-read", // POST
    GET_ASTRO_CHATS: "/api/chat/astrologer",
  },
};
