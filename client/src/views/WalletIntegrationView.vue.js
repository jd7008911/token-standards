import { ref, onMounted } from 'vue';
import api from '@/api';
const walletMethods = ref([]);
const securityPractices = ref([]);
onMounted(async () => {
    const [methodsRes, securityRes] = await Promise.all([
        api.get('/wallets/methods'),
        api.get('/wallets/security'),
    ]);
    if (methodsRes.data.success)
        walletMethods.value = methodsRes.data.data;
    if (securityRes.data.success)
        securityPractices.value = securityRes.data.data;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['flow-list']} */ ;
/** @type {__VLS_StyleScopedClasses['check-list']} */ ;
/** @type {__VLS_StyleScopedClasses['pc-list']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "section-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "section-subtitle" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid-2 mb" },
});
for (const [method] of __VLS_getVForSourceType((__VLS_ctx.walletMethods))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (method.type),
        ...{ class: "card wallet-card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wallet-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "card-title" },
    });
    (method.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "badge" },
        ...{ class: (method.type === 'MetaMask' ? 'badge-primary' : 'badge-accent') },
    });
    (method.type);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "card-desc" },
    });
    (method.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "sub-heading" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)({
        ...{ class: "flow-list" },
    });
    for (const [step, i] of __VLS_getVForSourceType((method.connectionFlow))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (i),
        });
        (step);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "sub-heading mt" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "check-list" },
    });
    for (const [feature] of __VLS_getVForSourceType((method.securityFeatures))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (feature),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "check" },
        });
        (feature);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pros-cons mt" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: "pc-label pros-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "pc-list" },
    });
    for (const [pro] of __VLS_getVForSourceType((method.pros))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (pro),
        });
        (pro);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: "pc-label cons-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "pc-list" },
    });
    for (const [con] of __VLS_getVForSourceType((method.cons))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (con),
        });
        (con);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "card-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "practices-grid" },
});
for (const [practice] of __VLS_getVForSourceType((__VLS_ctx.securityPractices))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (practice.title),
        ...{ class: "practice-card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "practice-title" },
    });
    (practice.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "practice-desc" },
    });
    (practice.description);
}
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['section-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['wallet-card']} */ ;
/** @type {__VLS_StyleScopedClasses['wallet-header']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['sub-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-list']} */ ;
/** @type {__VLS_StyleScopedClasses['sub-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['mt']} */ ;
/** @type {__VLS_StyleScopedClasses['check-list']} */ ;
/** @type {__VLS_StyleScopedClasses['check']} */ ;
/** @type {__VLS_StyleScopedClasses['pros-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['mt']} */ ;
/** @type {__VLS_StyleScopedClasses['pc-label']} */ ;
/** @type {__VLS_StyleScopedClasses['pros-label']} */ ;
/** @type {__VLS_StyleScopedClasses['pc-list']} */ ;
/** @type {__VLS_StyleScopedClasses['pc-label']} */ ;
/** @type {__VLS_StyleScopedClasses['cons-label']} */ ;
/** @type {__VLS_StyleScopedClasses['pc-list']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['practices-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-card']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-title']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-desc']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            walletMethods: walletMethods,
            securityPractices: securityPractices,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
