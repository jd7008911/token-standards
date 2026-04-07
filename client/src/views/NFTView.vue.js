import { ref, onMounted } from 'vue';
import api from '@/api';
const projects = ref([]);
const metadata = ref(null);
const mintingFlow = ref([]);
const storage = ref([]);
const activeProject = ref(0);
onMounted(async () => {
    const [pRes, mRes, fRes, sRes] = await Promise.all([
        api.get('/nft/projects'),
        api.get('/nft/metadata-example'),
        api.get('/nft/minting-flow'),
        api.get('/nft/storage'),
    ]);
    if (pRes.data.success)
        projects.value = pRes.data.data;
    if (mRes.data.success)
        metadata.value = mRes.data.data;
    if (fRes.data.success)
        mintingFlow.value = fRes.data.data;
    if (sRes.data.success)
        storage.value = sRes.data.data;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['tab']} */ ;
/** @type {__VLS_StyleScopedClasses['tab']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-list']} */ ;
/** @type {__VLS_StyleScopedClasses['step-list']} */ ;
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
    ...{ class: "tabs" },
});
for (const [p, i] of __VLS_getVForSourceType((__VLS_ctx.projects))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.activeProject = i;
            } },
        key: (p.name),
        ...{ class: "tab" },
        ...{ class: ({ active: __VLS_ctx.activeProject === i }) },
    });
    (p.category);
}
if (__VLS_ctx.projects[__VLS_ctx.activeProject]) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card mb" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "proj-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "card-title" },
    });
    (__VLS_ctx.projects[__VLS_ctx.activeProject].name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "badge badge-accent" },
    });
    (__VLS_ctx.projects[__VLS_ctx.activeProject].standard);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "card-desc" },
    });
    (__VLS_ctx.projects[__VLS_ctx.activeProject].description);
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
    for (const [d] of __VLS_getVForSourceType((__VLS_ctx.projects[__VLS_ctx.activeProject].technicalDetails))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (d),
        });
        (d);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "sub-heading" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)({
        ...{ class: "step-list" },
    });
    for (const [s] of __VLS_getVForSourceType((__VLS_ctx.projects[__VLS_ctx.activeProject].deploymentSteps))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (s),
        });
        (s);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "section-title sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flow-timeline mb" },
});
for (const [step] of __VLS_getVForSourceType((__VLS_ctx.mintingFlow))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (step.step),
        ...{ class: "flow-card card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "step-number" },
    });
    (step.step);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "card-title" },
    });
    (step.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "card-desc" },
    });
    (step.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mono" },
    });
    (step.code);
}
if (__VLS_ctx.metadata) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card mb" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "card-title" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "card-desc" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({
        ...{ class: "metadata-json" },
    });
    (JSON.stringify(__VLS_ctx.metadata, null, 2));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "section-title sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid-3" },
});
for (const [sol] of __VLS_getVForSourceType((__VLS_ctx.storage))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (sol.name),
        ...{ class: "card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "sol-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "card-title" },
    });
    (sol.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "badge" },
        ...{ class: (sol.type === 'Decentralized' ? 'badge-success' : sol.type === 'On-Chain' ? 'badge-primary' : 'badge-accent') },
    });
    (sol.type);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "card-desc" },
    });
    (sol.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pros-cons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: "pc-label pros-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "pc-list" },
    });
    for (const [p] of __VLS_getVForSourceType((sol.pros))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (p),
        });
        (p);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: "pc-label cons-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "pc-list" },
    });
    for (const [c] of __VLS_getVForSourceType((sol.cons))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (c),
        });
        (c);
    }
}
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['section-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['tab']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['mb']} */ ;
/** @type {__VLS_StyleScopedClasses['proj-header']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-2']} */ ;
/** @type {__VLS_StyleScopedClasses['sub-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-list']} */ ;
/** @type {__VLS_StyleScopedClasses['sub-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['step-list']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-timeline']} */ ;
/** @type {__VLS_StyleScopedClasses['mb']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['mono']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['mb']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['metadata-json']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['sm']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-3']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['sol-header']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['pros-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['pc-label']} */ ;
/** @type {__VLS_StyleScopedClasses['pros-label']} */ ;
/** @type {__VLS_StyleScopedClasses['pc-list']} */ ;
/** @type {__VLS_StyleScopedClasses['pc-label']} */ ;
/** @type {__VLS_StyleScopedClasses['cons-label']} */ ;
/** @type {__VLS_StyleScopedClasses['pc-list']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            projects: projects,
            metadata: metadata,
            mintingFlow: mintingFlow,
            storage: storage,
            activeProject: activeProject,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
