const baseUrl = "http://localhost:3200/";

const routes = {
  home: { url: "/" },
  create: { url: "/create" },
  signUp: { url: "/sign_up" },
  settings: { url: "/settings" },
  analyzer: { url: "/analyze" },
  redirect: { url: "/redirect" },
  playlistView: { url: "/playlists" },
  artistTinder: { url: "/artist_tinder" },
};

const errorCodesLabels = {
  0: "",
  401: "You have entered an invalid username or password",
  400: "User already exists",
  500: "Internal server error",
  429: "Too Many Songs",
  ERR_NETWORK: "Network error",
};
const successCodes = [
  200,201
];

const lowerCaseList = [
  "of",
  "and",
  "as",
  "but",
  "for",
  "if",
  "nor",
  "or",
  "so",
  "yet",
  "a",
  "an",
  "the",
  "as",
  "at",
  "by",
  "for",
  "in",
  "of",
  "off",
  "on",
  "per",
  "to",
  "up",
  "via",
];

const REFRESH_TIMER = 30 * 60 * 1000;

export { routes, baseUrl, errorCodesLabels, lowerCaseList, successCodes, REFRESH_TIMER };
