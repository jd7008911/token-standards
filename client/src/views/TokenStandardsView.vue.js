import { ref, onMounted } from 'vue';
import api from '@/api';
const standards = ref([]);
const activeTab = ref('ERC-20');
const comparison = ref(null);
onMounted(async () => {
    const [stdRes, cmpRes] = await Promise.all([
        api.get('/tokens/standards'),
        api.get('/tokens/compare'),
    ]);
    if (stdRes.data.success)
        standards.value = stdRes.data.data;
    if (cmpRes.data.success)
        comparison.value = cmpRes.data.data;
});
const activeStandard = () => standards.value.find(s => s.type === activeTab.value);
const featureLabels = {
    tokenType: 'Token Type',
    uniqueness: 'Uniqueness',
    divisibility: 'Divisibility',
    metadata: 'Metadata',
    batchOperations: 'Batch Operations',
    gasEfficiency: 'Gas Efficiency',
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['tab']} */ ;
/** @type {__VLS_StyleScopedClasses['tab']} */ ;
/** @type {__VLS_StyleScopedClasses['use-list']} */ ;
/** @type {__VLS_StyleScopedClasses['compare-table']} */ ;
/** @type {__VLS_StyleScopedClasses['compare-table']} */ ;
/** @type {__VLS_StyleScopedClasses['compare-table']} */ ;
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
for (const [std] of __VLS_getVForSourceType((__VLS_ctx.standards))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.activeTab = std.type;
            } },
        key: (std.type),
        ...{ class: "tab" },
        ...{ class: ({ active: __VLS_ctx.activeTab === std.type }) },
    });
    (std.name);
}
if (__VLS_ctx.activeStandard()) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card mb" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "standard-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "card-title" },
    });
    (__VLS_ctx.activeStandard().name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "badge badge-primary" },
    });
    (__VLS_ctx.activeStandard().features.tokenType);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "card-desc" },
    });
    (__VLS_ctx.activeStandard().description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "grid-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "sub-heading" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "fn-list" },
    });
    for (const [fn] of __VLS_getVForSourceType((__VLS_ctx.activeStandard().keyFunctions))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (fn),
            ...{ class: "fn-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
        (fn);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "sub-heading" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "use-list" },
    });
    for (const [uc] of __VLS_getVForSourceType((__VLS_ctx.activeStandard().useCases))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (uc),
        });
        (uc);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "sub-heading mt" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "feature-grid" },
    });
    for (const [val, key] of __VLS_getVForSourceType((__VLS_ctx.activeStandard().features))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (key),
            ...{ class: "feature-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "feature-label" },
        });
        (__VLS_ctx.featureLabels[key] || key);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "feature-value" },
        });
        (val);
    }
}
if (__VLS_ctx.comparison) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "card-title" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-wrap" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        ...{ class: "compare-table" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [values, feature] of __VLS_getVForSourceType((__VLS_ctx.comparison))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (feature),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "feature-name" },
        });
        (__VLS_ctx.featureLabels[feature] || feature);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (values['ERC-20']);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (values['ERC-721']);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (values['ERC-1155']);
    }
}
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['section-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['tab']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['mb']} */ ;
/** @type {__VLS_StyleScopedClasses['standard-header']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-2']} */ ;
/** @type {__VLS_StyleScopedClasses['sub-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['fn-list']} */ ;
/** @type {__VLS_StyleScopedClasses['fn-item']} */ ;
/** @type {__VLS_StyleScopedClasses['sub-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['use-list']} */ ;
/** @type {__VLS_StyleScopedClasses['sub-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['mt']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-row']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-label']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['table-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['compare-table']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-name']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            standards: standards,
            activeTab: activeTab,
            comparison: comparison,
            activeStandard: activeStandard,
            featureLabels: featureLabels,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
