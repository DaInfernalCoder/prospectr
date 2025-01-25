# Project Overview
This will be a lead finder web application called prospectr, it will allow users to find leads by searching for them on linkedin.

THIS IS A MICRO SAAS, AS SUCH ONE FEATURE WILL BE COMPLETED WITH THE LANDED PAGE AND SHIPPED


# Core Functionality
1. Search
- Users will be able to search for leads by name, company, and location.
- Users will be able to view a lead's profile and see their connections.
2. Export 
- Users will be able to save a lead to their list of leads.
- Users will be able to export their list of leads to a csv file.
3. Campaigns
- Users can automatically search for leads by providing a description, which will be processed by a LLM to find the best leads.
- Leads will automatically use linkedin api to send a connection request and a follow up message.
- Users can select rate to send messages/connections per day as follows linkedin api rate limits (max 50 connects per day)
- Users can select from a list of templates to send to leads.
4. Conversations
- Users will be able to view and manage their conversations with leads.
- Users will be able to send messages to leads and track their responses.
# Tech Stack
you will use next js 14, tailwind css, daisy ui, shadcn ui, linkedin api, lucid icons, and supabase.
# Docs

# Current File Structure
Prospectr/
├─ .cursorignore
├─ .cursorrules
├─ .env.local
├─ .eslintrc.json
├─ .gitignore
├─ .next/
│  ├─ app-build-manifest.json
│  ├─ build-manifest.json
│  ├─ cache/
│  │  ├─ .rscinfo
│  │  ├─ images/
│  │  │  └─ pyZcBGFJ-ecatVcACcx7pNywYpwZcw1-y4e3hlflEqk/
│  │  │     └─ 31536000.1769196601826.2uTG0dNCzS5K_zrHs67uJohUCFYx4oeGI3tBFL4TY-c.hybxOCT8_TIG-QmriNU0DipJVVbjAkm_rXSnrdz7lGo.webp
│  │  ├─ swc/
│  │  │  └─ plugins/
│  │  │     └─ v7_macos_aarch64_4.0.0/
│  │  └─ webpack/
│  │     ├─ client-development/
│  │     │  ├─ 0.pack.gz
│  │     │  ├─ 1.pack.gz
│  │     │  ├─ 10.pack.gz
│  │     │  ├─ 11.pack.gz
│  │     │  ├─ 12.pack.gz
│  │     │  ├─ 13.pack.gz
│  │     │  ├─ 14.pack.gz
│  │     │  ├─ 15.pack.gz
│  │     │  ├─ 16.pack.gz
│  │     │  ├─ 17.pack.gz
│  │     │  ├─ 18.pack.gz
│  │     │  ├─ 19.pack.gz
│  │     │  ├─ 2.pack.gz
│  │     │  ├─ 3.pack.gz
│  │     │  ├─ 4.pack.gz
│  │     │  ├─ 5.pack.gz
│  │     │  ├─ 6.pack.gz
│  │     │  ├─ 7.pack.gz
│  │     │  ├─ 8.pack.gz
│  │     │  ├─ 9.pack.gz
│  │     │  └─ index.pack.gz.old
│  │     ├─ client-development-fallback/
│  │     │  ├─ 0.pack.gz
│  │     │  ├─ 1.pack.gz
│  │     │  ├─ index.pack.gz
│  │     │  └─ index.pack.gz.old
│  │     ├─ edge-server-development/
│  │     │  ├─ 0.pack.gz
│  │     │  ├─ 1.pack.gz
│  │     │  ├─ 2.pack.gz
│  │     │  ├─ index.pack.gz
│  │     │  └─ index.pack.gz.old
│  │     └─ server-development/
│  │        ├─ 0.pack.gz
│  │        ├─ 1.pack.gz
│  │        ├─ 10.pack.gz
│  │        ├─ 11.pack.gz
│  │        ├─ 12.pack.gz
│  │        ├─ 13.pack.gz
│  │        ├─ 14.pack.gz
│  │        ├─ 15.pack.gz
│  │        ├─ 16.pack.gz
│  │        ├─ 17.pack.gz
│  │        ├─ 18.pack.gz
│  │        ├─ 19.pack.gz
│  │        ├─ 2.pack.gz
│  │        ├─ 20.pack.gz
│  │        ├─ 21.pack.gz
│  │        ├─ 22.pack.gz
│  │        ├─ 23.pack.gz
│  │        ├─ 24.pack.gz
│  │        ├─ 25.pack.gz
│  │        ├─ 26.pack.gz
│  │        ├─ 27.pack.gz
│  │        ├─ 28.pack.gz
│  │        ├─ 29.pack.gz
│  │        ├─ 3.pack.gz
│  │        ├─ 30.pack.gz
│  │        ├─ 4.pack.gz
│  │        ├─ 5.pack.gz
│  │        ├─ 6.pack.gz
│  │        ├─ 7.pack.gz
│  │        ├─ 8.pack.gz
│  │        ├─ 9.pack.gz
│  │        ├─ index.pack.gz
│  │        └─ index.pack.gz.old
│  ├─ package.json
│  ├─ react-loadable-manifest.json
│  ├─ server/
│  │  ├─ _32c4-_66e9.js
│  │  ├─ app/
│  │  │  ├─ [...survey]/
│  │  │  │  ├─ page.js
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ _not-found/
│  │  │  │  ├─ page.js
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ api/
│  │  │  │  ├─ auth/
│  │  │  │  │  └─ callback/
│  │  │  │  │     ├─ route.js
│  │  │  │  │     └─ route_client-reference-manifest.js
│  │  │  │  ├─ linkedin/
│  │  │  │  │  └─ accounts/
│  │  │  │  │     ├─ route.js
│  │  │  │  │     └─ route_client-reference-manifest.js
│  │  │  │  └─ stripe/
│  │  │  │     └─ create-portal/
│  │  │  │        ├─ route.js
│  │  │  │        └─ route_client-reference-manifest.js
│  │  │  ├─ dashboard/
│  │  │  │  ├─ analytics/
│  │  │  │  │  ├─ page.js
│  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  ├─ campaigns/
│  │  │  │  │  ├─ page.js
│  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page_client-reference-manifest.js
│  │  │  │  └─ settings/
│  │  │  │     ├─ page.js
│  │  │  │     └─ page_client-reference-manifest.js
│  │  │  ├─ icon.png/
│  │  │  │  └─ route.js
│  │  │  ├─ page.js
│  │  │  ├─ page_client-reference-manifest.js
│  │  │  ├─ signin/
│  │  │  │  ├─ page.js
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  └─ tos/
│  │  │     ├─ page.js
│  │  │     └─ page_client-reference-manifest.js
│  │  ├─ app-paths-manifest.json
│  │  ├─ edge-runtime-webpack.js
│  │  ├─ interception-route-rewrite-manifest.js
│  │  ├─ middleware-build-manifest.js
│  │  ├─ middleware-manifest.json
│  │  ├─ middleware-react-loadable-manifest.js
│  │  ├─ middleware.js
│  │  ├─ next-font-manifest.js
│  │  ├─ next-font-manifest.json
│  │  ├─ pages/
│  │  ├─ pages-manifest.json
│  │  ├─ server-reference-manifest.js
│  │  ├─ server-reference-manifest.json
│  │  ├─ static/
│  │  │  └─ webpack/
│  │  │     └─ 633457081244afec._.hot-update.json
│  │  ├─ vendor-chunks/
│  │  │  ├─ @floating-ui.js
│  │  │  ├─ @headlessui.js
│  │  │  ├─ @radix-ui.js
│  │  │  ├─ @splinetool.js
│  │  │  ├─ @supabase.js
│  │  │  ├─ @swc.js
│  │  │  ├─ aria-hidden.js
│  │  │  ├─ asynckit.js
│  │  │  ├─ axios.js
│  │  │  ├─ call-bind-apply-helpers.js
│  │  │  ├─ call-bound.js
│  │  │  ├─ class-variance-authority.js
│  │  │  ├─ classnames.js
│  │  │  ├─ clsx.js
│  │  │  ├─ combined-stream.js
│  │  │  ├─ crisp-sdk-web.js
│  │  │  ├─ daisyui.js
│  │  │  ├─ debug.js
│  │  │  ├─ delayed-stream.js
│  │  │  ├─ dunder-proto.js
│  │  │  ├─ es-define-property.js
│  │  │  ├─ es-errors.js
│  │  │  ├─ es-object-atoms.js
│  │  │  ├─ follow-redirects.js
│  │  │  ├─ form-data.js
│  │  │  ├─ function-bind.js
│  │  │  ├─ get-intrinsic.js
│  │  │  ├─ get-nonce.js
│  │  │  ├─ get-proto.js
│  │  │  ├─ goober.js
│  │  │  ├─ gopd.js
│  │  │  ├─ has-flag.js
│  │  │  ├─ has-symbols.js
│  │  │  ├─ hasown.js
│  │  │  ├─ jose.js
│  │  │  ├─ lodash.debounce.js
│  │  │  ├─ lucide-react.js
│  │  │  ├─ math-intrinsics.js
│  │  │  ├─ mime-db.js
│  │  │  ├─ mime-types.js
│  │  │  ├─ ms.js
│  │  │  ├─ next-plausible.js
│  │  │  ├─ next.js
│  │  │  ├─ nextjs-toploader.js
│  │  │  ├─ nprogress.js
│  │  │  ├─ object-assign.js
│  │  │  ├─ object-inspect.js
│  │  │  ├─ prop-types.js
│  │  │  ├─ proxy-from-env.js
│  │  │  ├─ qs.js
│  │  │  ├─ react-hot-toast.js
│  │  │  ├─ react-is.js
│  │  │  ├─ react-merge-refs.js
│  │  │  ├─ react-remove-scroll-bar.js
│  │  │  ├─ react-remove-scroll.js
│  │  │  ├─ react-style-singleton.js
│  │  │  ├─ react-tooltip.js
│  │  │  ├─ react-type-animation.js
│  │  │  ├─ set-cookie-parser.js
│  │  │  ├─ side-channel-list.js
│  │  │  ├─ side-channel-map.js
│  │  │  ├─ side-channel-weakmap.js
│  │  │  ├─ side-channel.js
│  │  │  ├─ stripe.js
│  │  │  ├─ supports-color.js
│  │  │  ├─ tailwind-merge.js
│  │  │  ├─ tr46.js
│  │  │  ├─ tslib.js
│  │  │  ├─ use-callback-ref.js
│  │  │  ├─ use-sidecar.js
│  │  │  ├─ webidl-conversions.js
│  │  │  ├─ whatwg-url.js
│  │  │  └─ ws.js
│  │  └─ webpack-runtime.js
│  ├─ static/
│  │  ├─ chunks/
│  │  │  ├─ _app-pages-browser_node_modules_splinetool_react-spline_dist_react-spline_js.js
│  │  │  ├─ _app-pages-browser_node_modules_splinetool_runtime_build_boolean_js.js
│  │  │  ├─ _app-pages-browser_node_modules_splinetool_runtime_build_gaussian-splat-compression_js.js
│  │  │  ├─ _app-pages-browser_node_modules_splinetool_runtime_build_howler_js.js
│  │  │  ├─ _app-pages-browser_node_modules_splinetool_runtime_build_navmesh_js.js
│  │  │  ├─ _app-pages-browser_node_modules_splinetool_runtime_build_opentype_js.js
│  │  │  ├─ _app-pages-browser_node_modules_splinetool_runtime_build_physics_js.js
│  │  │  ├─ _app-pages-browser_node_modules_splinetool_runtime_build_process_js.js
│  │  │  ├─ _app-pages-browser_node_modules_splinetool_runtime_build_ui_js.js
│  │  │  ├─ _app-pages-browser_node_modules_ws_browser_js.js
│  │  │  ├─ app/
│  │  │  │  ├─ [...survey]/
│  │  │  │  │  └─ page.js
│  │  │  │  ├─ _not-found/
│  │  │  │  ├─ api/
│  │  │  │  │  ├─ auth/
│  │  │  │  │  │  └─ callback/
│  │  │  │  │  │     └─ route.js
│  │  │  │  │  ├─ linkedin/
│  │  │  │  │  │  └─ accounts/
│  │  │  │  │  │     └─ route.js
│  │  │  │  │  └─ stripe/
│  │  │  │  │     └─ create-portal/
│  │  │  │  │        └─ route.js
│  │  │  │  ├─ dashboard/
│  │  │  │  │  ├─ analytics/
│  │  │  │  │  │  └─ page.js
│  │  │  │  │  ├─ campaigns/
│  │  │  │  │  │  └─ page.js
│  │  │  │  │  ├─ layout.js
│  │  │  │  │  ├─ page.js
│  │  │  │  │  └─ settings/
│  │  │  │  │     └─ page.js
│  │  │  │  ├─ error.js
│  │  │  │  ├─ layout.js
│  │  │  │  ├─ not-found.js
│  │  │  │  ├─ page.js
│  │  │  │  ├─ signin/
│  │  │  │  │  ├─ layout.js
│  │  │  │  │  └─ page.js
│  │  │  │  └─ tos/
│  │  │  │     └─ page.js
│  │  │  ├─ app-pages-internals.js
│  │  │  ├─ main-app.js
│  │  │  ├─ main.js
│  │  │  ├─ pages/
│  │  │  ├─ polyfills.js
│  │  │  └─ webpack.js
│  │  ├─ css/
│  │  │  └─ app/
│  │  │     └─ layout.css
│  │  ├─ development/
│  │  │  ├─ _buildManifest.js
│  │  │  └─ _ssgManifest.js
│  │  ├─ media/
│  │  │  ├─ 26a46d62cd723877-s.woff2
│  │  │  ├─ 55c55f0601d81cf3-s.woff2
│  │  │  ├─ 581909926a08bbc8-s.woff2
│  │  │  ├─ 6d93bde91c0c2823-s.woff2
│  │  │  ├─ 97e0cb1ae144a2a9-s.woff2
│  │  │  ├─ a34f9d1faa5f3315-s.p.woff2
│  │  │  ├─ df0a9ae256c0569c-s.woff2
│  │  │  └─ icon.07bb94aa.png
│  │  └─ webpack/
│  │     ├─ 0544cd443851db01.webpack.hot-update.json
│  │     ├─ 0f8c5ed40158a859.webpack.hot-update.json
│  │     ├─ 1212f479af03dbb1.webpack.hot-update.json
│  │     ├─ 140c46e28658714b.webpack.hot-update.json
│  │     ├─ 1a6226d37af4bf19.webpack.hot-update.json
│  │     ├─ 232aff73f8bf217f.webpack.hot-update.json
│  │     ├─ 26dfc952694ec94d.webpack.hot-update.json
│  │     ├─ 326673c40bf17898.webpack.hot-update.json
│  │     ├─ 36ef2f4568b07fd7.webpack.hot-update.json
│  │     ├─ 3f79ac8ea94ad274.webpack.hot-update.json
│  │     ├─ 423ff74c0a3fc0d4.webpack.hot-update.json
│  │     ├─ 46ef3ad9ad8e26a8.webpack.hot-update.json
│  │     ├─ 47886351d7a4c0b9.webpack.hot-update.json
│  │     ├─ 4b4021139bc1671b.webpack.hot-update.json
│  │     ├─ 4fb40891ce2440ae.webpack.hot-update.json
│  │     ├─ 525f32b5611e3e42.webpack.hot-update.json
│  │     ├─ 5cd21ea14bf244dd.webpack.hot-update.json
│  │     ├─ 5eba8f99263de410.webpack.hot-update.json
│  │     ├─ 6211f670ddcb8b3d.webpack.hot-update.json
│  │     ├─ 633457081244afec._.hot-update.json
│  │     ├─ 6f8a0c6e3913cbd9.webpack.hot-update.json
│  │     ├─ 6fbbe08d5f546828.webpack.hot-update.json
│  │     ├─ 7f60f912a1f27a84.webpack.hot-update.json
│  │     ├─ 81fde5217b2ee501.webpack.hot-update.json
│  │     ├─ 8241d1af10e0d0ed.webpack.hot-update.json
│  │     ├─ 8454cc986dd54376.webpack.hot-update.json
│  │     ├─ 88c6a67d4aefc906.webpack.hot-update.json
│  │     ├─ 89a81e6b4e27e269.webpack.hot-update.json
│  │     ├─ 92b61b866f59bfdc.webpack.hot-update.json
│  │     ├─ 98352200c5e33117.webpack.hot-update.json
│  │     ├─ 9c41507e2de5fdb5.webpack.hot-update.json
│  │     ├─ a068c8636c6dfb46.webpack.hot-update.json
│  │     ├─ a0f36469cfedcc71.webpack.hot-update.json
│  │     ├─ a76c1193d818bf48.webpack.hot-update.json
│  │     ├─ aa0b559f6cb55d31.webpack.hot-update.json
│  │     ├─ ae2a3e9d2798e482.webpack.hot-update.json
│  │     ├─ app/
│  │     │  ├─ dashboard/
│  │     │  │  ├─ layout.232aff73f8bf217f.hot-update.js
│  │     │  │  ├─ layout.3f79ac8ea94ad274.hot-update.js
│  │     │  │  ├─ layout.6211f670ddcb8b3d.hot-update.js
│  │     │  │  ├─ layout.6f8a0c6e3913cbd9.hot-update.js
│  │     │  │  ├─ layout.ef5ef3d685465855.hot-update.js
│  │     │  │  ├─ layout.f057b1d5d8fa7a3f.hot-update.js
│  │     │  │  ├─ page.0544cd443851db01.hot-update.js
│  │     │  │  ├─ page.140c46e28658714b.hot-update.js
│  │     │  │  ├─ page.1a6226d37af4bf19.hot-update.js
│  │     │  │  ├─ page.4fb40891ce2440ae.hot-update.js
│  │     │  │  ├─ page.7f60f912a1f27a84.hot-update.js
│  │     │  │  ├─ page.81fde5217b2ee501.hot-update.js
│  │     │  │  ├─ page.92b61b866f59bfdc.hot-update.js
│  │     │  │  └─ page.d0abd70da7467b49.hot-update.js
│  │     │  ├─ layout.0f8c5ed40158a859.hot-update.js
│  │     │  ├─ layout.1212f479af03dbb1.hot-update.js
│  │     │  ├─ layout.232aff73f8bf217f.hot-update.js
│  │     │  ├─ layout.326673c40bf17898.hot-update.js
│  │     │  ├─ layout.36ef2f4568b07fd7.hot-update.js
│  │     │  ├─ layout.3f79ac8ea94ad274.hot-update.js
│  │     │  ├─ layout.423ff74c0a3fc0d4.hot-update.js
│  │     │  ├─ layout.46ef3ad9ad8e26a8.hot-update.js
│  │     │  ├─ layout.47886351d7a4c0b9.hot-update.js
│  │     │  ├─ layout.4b4021139bc1671b.hot-update.js
│  │     │  ├─ layout.525f32b5611e3e42.hot-update.js
│  │     │  ├─ layout.5cd21ea14bf244dd.hot-update.js
│  │     │  ├─ layout.6211f670ddcb8b3d.hot-update.js
│  │     │  ├─ layout.6f8a0c6e3913cbd9.hot-update.js
│  │     │  ├─ layout.8454cc986dd54376.hot-update.js
│  │     │  ├─ layout.88c6a67d4aefc906.hot-update.js
│  │     │  ├─ layout.98352200c5e33117.hot-update.js
│  │     │  ├─ layout.a068c8636c6dfb46.hot-update.js
│  │     │  ├─ layout.aa0b559f6cb55d31.hot-update.js
│  │     │  ├─ layout.ae2a3e9d2798e482.hot-update.js
│  │     │  ├─ layout.bc82c0687311f9ba.hot-update.js
│  │     │  ├─ layout.c9d9be87eb65cdc9.hot-update.js
│  │     │  ├─ layout.cb03d1312a5bf2ca.hot-update.js
│  │     │  ├─ layout.da301f47fb83f09f.hot-update.js
│  │     │  ├─ layout.de73d1fc26122214.hot-update.js
│  │     │  ├─ layout.ef5ef3d685465855.hot-update.js
│  │     │  ├─ layout.f057b1d5d8fa7a3f.hot-update.js
│  │     │  ├─ layout.f620f0599dbe41a4.hot-update.js
│  │     │  ├─ layout.f8fe3216b0b708b8.hot-update.js
│  │     │  ├─ page.0544cd443851db01.hot-update.js
│  │     │  ├─ page.140c46e28658714b.hot-update.js
│  │     │  ├─ page.1a6226d37af4bf19.hot-update.js
│  │     │  ├─ page.4fb40891ce2440ae.hot-update.js
│  │     │  ├─ page.7f60f912a1f27a84.hot-update.js
│  │     │  ├─ page.81fde5217b2ee501.hot-update.js
│  │     │  ├─ page.92b61b866f59bfdc.hot-update.js
│  │     │  ├─ page.d0abd70da7467b49.hot-update.js
│  │     │  └─ signin/
│  │     │     ├─ page.0f8c5ed40158a859.hot-update.js
│  │     │     ├─ page.1212f479af03dbb1.hot-update.js
│  │     │     ├─ page.36ef2f4568b07fd7.hot-update.js
│  │     │     ├─ page.423ff74c0a3fc0d4.hot-update.js
│  │     │     ├─ page.4b4021139bc1671b.hot-update.js
│  │     │     ├─ page.5cd21ea14bf244dd.hot-update.js
│  │     │     ├─ page.88c6a67d4aefc906.hot-update.js
│  │     │     ├─ page.98352200c5e33117.hot-update.js
│  │     │     ├─ page.aa0b559f6cb55d31.hot-update.js
│  │     │     ├─ page.c9d9be87eb65cdc9.hot-update.js
│  │     │     ├─ page.de73d1fc26122214.hot-update.js
│  │     │     └─ page.f620f0599dbe41a4.hot-update.js
│  │     ├─ bc82c0687311f9ba.webpack.hot-update.json
│  │     ├─ c3314771e2a3fb4b.webpack.hot-update.json
│  │     ├─ c649a15119a1d3bf.webpack.hot-update.json
│  │     ├─ c9d9be87eb65cdc9.webpack.hot-update.json
│  │     ├─ cb03d1312a5bf2ca.webpack.hot-update.json
│  │     ├─ cdc4a972756387b8.webpack.hot-update.json
│  │     ├─ d0abd70da7467b49.webpack.hot-update.json
│  │     ├─ da301f47fb83f09f.webpack.hot-update.json
│  │     ├─ de73d1fc26122214.webpack.hot-update.json
│  │     ├─ ef5ef3d685465855.webpack.hot-update.json
│  │     ├─ f057b1d5d8fa7a3f.webpack.hot-update.json
│  │     ├─ f620f0599dbe41a4.webpack.hot-update.json
│  │     ├─ f629d3427e5a1c50.webpack.hot-update.json
│  │     ├─ f8fe3216b0b708b8.webpack.hot-update.json
│  │     ├─ ff370d81006f9baa.webpack.hot-update.json
│  │     ├─ main.46ef3ad9ad8e26a8.hot-update.js
│  │     ├─ main.f629d3427e5a1c50.hot-update.js
│  │     ├─ webpack.0544cd443851db01.hot-update.js
│  │     ├─ webpack.0f8c5ed40158a859.hot-update.js
│  │     ├─ webpack.1212f479af03dbb1.hot-update.js
│  │     ├─ webpack.140c46e28658714b.hot-update.js
│  │     ├─ webpack.1a6226d37af4bf19.hot-update.js
│  │     ├─ webpack.232aff73f8bf217f.hot-update.js
│  │     ├─ webpack.26dfc952694ec94d.hot-update.js
│  │     ├─ webpack.326673c40bf17898.hot-update.js
│  │     ├─ webpack.36ef2f4568b07fd7.hot-update.js
│  │     ├─ webpack.3f79ac8ea94ad274.hot-update.js
│  │     ├─ webpack.423ff74c0a3fc0d4.hot-update.js
│  │     ├─ webpack.46ef3ad9ad8e26a8.hot-update.js
│  │     ├─ webpack.47886351d7a4c0b9.hot-update.js
│  │     ├─ webpack.4b4021139bc1671b.hot-update.js
│  │     ├─ webpack.4fb40891ce2440ae.hot-update.js
│  │     ├─ webpack.525f32b5611e3e42.hot-update.js
│  │     ├─ webpack.5cd21ea14bf244dd.hot-update.js
│  │     ├─ webpack.5eba8f99263de410.hot-update.js
│  │     ├─ webpack.6211f670ddcb8b3d.hot-update.js
│  │     ├─ webpack.6f8a0c6e3913cbd9.hot-update.js
│  │     ├─ webpack.6fbbe08d5f546828.hot-update.js
│  │     ├─ webpack.7f60f912a1f27a84.hot-update.js
│  │     ├─ webpack.81fde5217b2ee501.hot-update.js
│  │     ├─ webpack.8241d1af10e0d0ed.hot-update.js
│  │     ├─ webpack.8454cc986dd54376.hot-update.js
│  │     ├─ webpack.88c6a67d4aefc906.hot-update.js
│  │     ├─ webpack.89a81e6b4e27e269.hot-update.js
│  │     ├─ webpack.92b61b866f59bfdc.hot-update.js
│  │     ├─ webpack.98352200c5e33117.hot-update.js
│  │     ├─ webpack.9c41507e2de5fdb5.hot-update.js
│  │     ├─ webpack.a068c8636c6dfb46.hot-update.js
│  │     ├─ webpack.a0f36469cfedcc71.hot-update.js
│  │     ├─ webpack.a76c1193d818bf48.hot-update.js
│  │     ├─ webpack.aa0b559f6cb55d31.hot-update.js
│  │     ├─ webpack.ae2a3e9d2798e482.hot-update.js
│  │     ├─ webpack.bc82c0687311f9ba.hot-update.js
│  │     ├─ webpack.c3314771e2a3fb4b.hot-update.js
│  │     ├─ webpack.c649a15119a1d3bf.hot-update.js
│  │     ├─ webpack.c9d9be87eb65cdc9.hot-update.js
│  │     ├─ webpack.cb03d1312a5bf2ca.hot-update.js
│  │     ├─ webpack.cdc4a972756387b8.hot-update.js
│  │     ├─ webpack.d0abd70da7467b49.hot-update.js
│  │     ├─ webpack.da301f47fb83f09f.hot-update.js
│  │     ├─ webpack.de73d1fc26122214.hot-update.js
│  │     ├─ webpack.ef5ef3d685465855.hot-update.js
│  │     ├─ webpack.f057b1d5d8fa7a3f.hot-update.js
│  │     ├─ webpack.f620f0599dbe41a4.hot-update.js
│  │     ├─ webpack.f629d3427e5a1c50.hot-update.js
│  │     ├─ webpack.f8fe3216b0b708b8.hot-update.js
│  │     └─ webpack.ff370d81006f9baa.hot-update.js
│  ├─ trace
│  └─ types/
│     ├─ app/
│     │  ├─ [...survey]/
│     │  │  └─ page.ts
│     │  ├─ api/
│     │  │  ├─ auth/
│     │  │  │  └─ callback/
│     │  │  │     └─ route.ts
│     │  │  ├─ linkedin/
│     │  │  │  └─ accounts/
│     │  │  │     └─ route.ts
│     │  │  └─ stripe/
│     │  │     └─ create-portal/
│     │  │        └─ route.ts
│     │  ├─ dashboard/
│     │  │  ├─ analytics/
│     │  │  │  └─ page.ts
│     │  │  ├─ campaigns/
│     │  │  │  └─ page.ts
│     │  │  ├─ layout.ts
│     │  │  ├─ page.ts
│     │  │  └─ settings/
│     │  │     └─ page.ts
│     │  ├─ layout.ts
│     │  ├─ page.ts
│     │  ├─ signin/
│     │  │  ├─ layout.ts
│     │  │  └─ page.ts
│     │  └─ tos/
│     │     └─ page.ts
│     ├─ cache-life.d.ts
│     └─ package.json
├─ README.md
├─ app/
│  ├─ [...survey]/
│  │  ├─ _assets/
│  │  │  └─ components/
│  │  │     └─ SurveyTable.js
│  │  └─ page.js
│  ├─ api/
│  │  ├─ auth/
│  │  │  └─ callback/
│  │  │     └─ route.js
│  │  ├─ lead/
│  │  │  └─ route.js
│  │  ├─ linkedin/
│  │  │  ├─ accounts/
│  │  │  │  └─ route.js
│  │  │  └─ connect/
│  │  │     └─ route.js
│  │  ├─ public/
│  │  │  ├─ getPublic/
│  │  │  │  └─ route.js
│  │  │  └─ votePublic/
│  │  │     └─ route.js
│  │  ├─ stripe/
│  │  │  ├─ create-checkout/
│  │  │  │  └─ route.js
│  │  │  └─ create-portal/
│  │  │     └─ route.js
│  │  ├─ user/
│  │  │  ├─ createSurvey/
│  │  │  │  └─ route.js
│  │  │  ├─ deleteSurvey/
│  │  │  │  └─ route.js
│  │  │  └─ userSurvey/
│  │  │     └─ route.js
│  │  └─ webhook/
│  │     └─ stripe/
│  │        └─ route.js
│  ├─ apple-icon.png
│  ├─ blog/
│  │  ├─ [articleId]/
│  │  │  └─ page.js
│  │  ├─ _assets/
│  │  │  ├─ components/
│  │  │  │  ├─ Avatar.js
│  │  │  │  ├─ BadgeCategory.js
│  │  │  │  ├─ CardArticle.js
│  │  │  │  ├─ CardCategory.js
│  │  │  │  └─ HeaderBlog.js
│  │  │  ├─ content.js
│  │  │  └─ images/
│  │  │     └─ authors/
│  │  │        └─ marc.png
│  │  ├─ author/
│  │  │  └─ [authorId]/
│  │  │     └─ page.js
│  │  ├─ category/
│  │  │  └─ [categoryId]/
│  │  │     └─ page.js
│  │  ├─ layout.js
│  │  └─ page.js
│  ├─ dashboard/
│  │  ├─ analytics/
│  │  │  └─ page.js
│  │  ├─ campaigns/
│  │  │  ├─ [id]/
│  │  │  │  └─ page.js
│  │  │  └─ page.js
│  │  ├─ layout.js
│  │  ├─ page.js
│  │  └─ settings/
│  │     └─ page.js
│  ├─ error.js
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ icon.png
│  ├─ layout.js
│  ├─ not-found.js
│  ├─ opengraph-image.png
│  ├─ page.js
│  ├─ privacy-policy/
│  │  └─ page.js
│  ├─ signin/
│  │  ├─ layout.js
│  │  └─ page.js
│  ├─ thankyou/
│  │  └─ page.js
│  ├─ tos/
│  │  └─ page.js
│  └─ twitter-image.png
├─ cline_docs/
│  ├─ .cursorrules
│  ├─ activeContext.md
│  ├─ instructions.md
│  ├─ productContext.md
│  ├─ systemPatterns.md
│  └─ techContext.md
├─ components/
│  ├─ BetterIcon.js
│  ├─ ButtonAccount.js
│  ├─ ButtonCheckout.js
│  ├─ ButtonGradient.js
│  ├─ ButtonLead.js
│  ├─ ButtonPopover.js
│  ├─ ButtonSignin.js
│  ├─ ButtonSupport.js
│  ├─ CTA.js
│  ├─ FAQ.js
│  ├─ FeaturesAccordion.js
│  ├─ FeaturesListicle.js
│  ├─ Footer.js
│  ├─ Header.js
│  ├─ Hero.js
│  ├─ LayoutClient.js
│  ├─ Modal.js
│  ├─ OtherTools.js
│  ├─ Pricing.js
│  ├─ Problem.js
│  ├─ Testimonial1Small.js
│  ├─ TestimonialRating.js
│  ├─ Testimonials1.js
│  ├─ Testimonials11.js
│  ├─ Testimonials3.js
│  ├─ TestimonialsAvatars.js
│  ├─ WithWithout.js
│  ├─ dashboard/
│  │  ├─ DashboardShell.js
│  │  └─ LinkedInAccounts.js
│  └─ ui/
│     ├─ button.js
│     ├─ hero-section-dark.jsx
│     ├─ hero-video-dialog.jsx
│     ├─ input.js
│     ├─ pricing-creative.jsx
│     ├─ rainbow-button.jsx
│     ├─ select.js
│     ├─ sidebar.jsx
│     ├─ splite.jsx
│     └─ table.jsx
├─ components.json
├─ config.js
├─ jsconfig.json
├─ lib/
│  └─ utils.js
├─ libs/
│  ├─ api.js
│  ├─ gpt.js
│  ├─ seo.js
│  ├─ stripe.js
│  ├─ supabase-client.js
│  └─ unipile.js
├─ middleware.js
├─ migrations/
│  └─ linkedin_accounts.sql
├─ models/
│  ├─ Lead.js
│  ├─ LinkedInAccount.js
│  ├─ User.js
│  └─ plugins/
│     └─ toJSON.js
├─ next-sitemap.config.js
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public/
│  ├─ apple-icon.png
│  └─ blog/
│     └─ introducing-supabase/
│        └─ header.png
└─ tailwind.config.js
