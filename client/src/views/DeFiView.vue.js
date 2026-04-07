import { ref, onMounted } from 'vue';
import api from '@/api';
const protocols = ref([]);
const concepts = ref([]);
const pool = ref(null);
const activeProtocol = ref(0);
onMounted(async () => {
    const [pRes, cRes, lRes] = await Promise.all([
        api.get('/defi/protocols'),
        api.get('/defi/concepts'),
        api.get('/defi/liquidity-pool'),
    ]);
    if (pRes.data.success)
        protocols.value = pRes.data.data;
    if (cRes.data.success)
        concepts.value = cRes.data.data;
    if (lRes.data.success)
        pool.value = lRes.data.data;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['tab']} */ ;
/** @type {__VLS_StyleScopedClasses['tab']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-list']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-list']} */ ;
/** @type {__VLS_StyleScopedClasses['risk-list']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-list']} */ ;
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
    ...{ class: "tabs" },
});
for (const [p, i] of __VLS_getVForSourceType((__VLS_ctx.protocols))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.activeProtocol = i;
            } },
        key: (p.name),
        ...{ class: "tab" },
        ...{ class: ({ active: __VLS_ctx.activeProtocol === i }) },
    });
    (p.category);
}
if (__VLS_ctx.protocols[__VLS_ctx.activeProtocol]) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card mb" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "proto-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "card-title" },
    });
    (__VLS_ctx.protocols[__VLS_ctx.activeProtocol].name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "badge badge-primary" },
    });
    (__VLS_ctx.protocols[__VLS_ctx.activeProtocol].tokenStandard);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "card-desc" },
    });
    (__VLS_ctx.protocols[__VLS_ctx.activeProtocol].description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "grid-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "sub-heading" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "detail-list" },
    });
    for (const [m] of __VLS_getVForSourceType((__VLS_ctx.protocols[__VLS_ctx.activeProtocol].keyMechanisms))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (m),
        });
        (m);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "sub-heading mt" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "detail-list" },
    });
    for (const [c] of __VLS_getVForSourceType((__VLS_ctx.protocols[__VLS_ctx.activeProtocol].smartContracts))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (c),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
        (c);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "sub-heading" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "risk-list" },
    });
    for (const [r] of __VLS_getVForSourceType((__VLS_ctx.protocols[__VLS_ctx.activeProtocol].risks))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (r),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "risk-icon" },
        });
        (r);
    }
}
if (__VLS_ctx.pool) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card mb" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "card-title" },
    });
    (__VLS_ctx.pool.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "card-desc" },
    });
    (__VLS_ctx.pool.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "formula-box" },
    });
    (__VLS_ctx.pool.formula);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)({
        ...{ class: "flow-list" },
    });
    for (const [step] of __VLS_getVForSourceType((__VLS_ctx.pool.mechanism))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (step),
        });
        (step);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "il-box mt" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "sub-heading" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "card-desc" },
    });
    (__VLS_ctx.pool.impermanentLossExplained);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "section-title sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid-2" },
});
for (const [concept] of __VLS_getVForSourceType((__VLS_ctx.concepts))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (concept.title),
        ...{ class: "card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "card-title" },
    });
    (concept.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "card-desc" },
    });
    (concept.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: "mini-heading" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "detail-list" },
    });
    for (const [ex] of __VLS_getVForSourceType((concept.examples))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (ex),
        });
        (ex);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: "mini-heading mt" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "fn-tags" },
    });
    for (const [fn] of __VLS_getVForSourceType((concept.relatedFunctions))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({
            key: (fn),
            ...{ class: "fn-tag" },
        });
        (fn);
    }
}
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['section-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['tab']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['mb']} */ ;
/** @type {__VLS_StyleScopedClasses['proto-header']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-2']} */ ;
/** @type {__VLS_StyleScopedClasses['sub-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-list']} */ ;
/** @type {__VLS_StyleScopedClasses['sub-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['mt']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-list']} */ ;
/** @type {__VLS_StyleScopedClasses['sub-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['risk-list']} */ ;
/** @type {__VLS_StyleScopedClasses['risk-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['mb']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['formula-box']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-list']} */ ;
/** @type {__VLS_StyleScopedClasses['il-box']} */ ;
/** @type {__VLS_StyleScopedClasses['mt']} */ ;
/** @type {__VLS_StyleScopedClasses['sub-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['sm']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-2']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['mini-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-list']} */ ;
/** @type {__VLS_StyleScopedClasses['mini-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['mt']} */ ;
/** @type {__VLS_StyleScopedClasses['fn-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['fn-tag']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            protocols: protocols,
            concepts: concepts,
            pool: pool,
            activeProtocol: activeProtocol,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
