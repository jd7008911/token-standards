import { RouterLink } from 'vue-router';
const sections = [
    {
        title: 'Cryptography',
        description: 'Hash functions, public-key cryptography, and digital signatures — the foundation of blockchain security.',
        route: '/cryptography',
        icon: '🔐',
        badges: ['SHA-256', 'ECC', 'ECDSA'],
    },
    {
        title: 'Token Standards',
        description: 'ERC-20, ERC-721, and ERC-1155 — the rules governing fungible, non-fungible, and multi-token digital assets.',
        route: '/tokens',
        icon: '🪙',
        badges: ['ERC-20', 'ERC-721', 'ERC-1155'],
    },
    {
        title: 'Wallet Integration',
        description: 'MetaMask and WalletConnect — connecting users to Web3 securely with best practices.',
        route: '/wallets',
        icon: '👛',
        badges: ['MetaMask', 'WalletConnect', 'EIP-712'],
    },
    {
        title: 'DeFi Platforms',
        description: 'Decentralized exchanges, lending protocols, and yield farming — building the financial layer of Web3.',
        route: '/defi',
        icon: '🏦',
        badges: ['AMM', 'Lending', 'Yield Farming'],
    },
    {
        title: 'NFT Development',
        description: 'Generative art, gaming assets, and soulbound tokens — creating, minting, and managing non-fungible tokens.',
        route: '/nft',
        icon: '🎨',
        badges: ['Minting', 'Metadata', 'IPFS'],
    },
    {
        title: 'dApp Architecture',
        description: 'Smart contract patterns, deployment pipelines, and security audits — production-grade decentralized applications.',
        route: '/dapp',
        icon: '🏗️',
        badges: ['UUPS Proxy', 'CI/CD', 'Audit'],
    },
];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container home" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "hero" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "hero-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "highlight" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "hero-subtitle" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "grid-3" },
});
for (const [section] of __VLS_getVForSourceType((__VLS_ctx.sections))) {
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        key: (section.title),
        to: (section.route),
        ...{ class: "card section-card" },
    }));
    const __VLS_2 = __VLS_1({
        key: (section.title),
        to: (section.route),
        ...{ class: "card section-card" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "section-icon" },
    });
    (section.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "section-card-title" },
    });
    (section.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "section-card-desc" },
    });
    (section.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-badges" },
    });
    for (const [badge] of __VLS_getVForSourceType((section.badges))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            key: (badge),
            ...{ class: "badge badge-primary" },
        });
        (badge);
    }
    var __VLS_3;
}
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['home']} */ ;
/** @type {__VLS_StyleScopedClasses['hero']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-title']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-3']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['section-card']} */ ;
/** @type {__VLS_StyleScopedClasses['section-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['section-card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['section-card-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['section-badges']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RouterLink: RouterLink,
            sections: sections,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
