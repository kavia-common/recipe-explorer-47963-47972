Recipe Explorer Frontend Notes

- Theme: Ocean Professional (primary #2563EB, secondary/amber #F59E0B), minimalist design, subtle gradients and shadows.
- Routing:
  - /            -> Home (browse with search/filters)
  - /favorites   -> Favorites list
  - /recipe/:id  -> Recipe detail
- Favorites: stored client-side in localStorage via FavoritesService.
- Mock Data: RecipeService currently serves in-memory mock data with a simulated async delay.

Environment variables (to be set by orchestrator via .env; do not hardcode in code):
- NG_APP_API_BASE
- NG_APP_BACKEND_URL
- NG_APP_FRONTEND_URL
- NG_APP_WS_URL
- NG_APP_NODE_ENV
- NG_APP_ENABLE_SOURCE_MAPS
- NG_APP_PORT
- NG_APP_TRUST_PROXY
- NG_APP_LOG_LEVEL
- NG_APP_HEALTHCHECK_PATH
- NG_APP_FEATURE_FLAGS
- NG_APP_EXPERIMENTS_ENABLED

TODO(API):
- Replace mock data in RecipeService with HttpClient calls using NG_APP_API_BASE or NG_APP_BACKEND_URL when the backend is available.
- Consider adding pagination and server-side filters when integrating API.
