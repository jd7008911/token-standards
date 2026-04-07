import { ref, onMounted } from 'vue';
import api from '@/api';
const architecture = ref([]);
const pipeline = ref([]);
const patterns = ref([]);
const audit = ref([]);
onMounted(async () => {
    const [aRes, dRes, pRes, auRes] = await Promise.all([
        api.get('/dapp/architecture'),
        api.get('/dapp/deployment'),
        api.get('/dapp/patterns'),
        api.get('/dapp/audit'),
    ]);
    if (aRes.data.success)
        architecture.value = aRes.data.data;
    if (dRes.data.success)
        pipeline.value = dRes.data.data;
    if (pRes.data.success)
        patterns.value = pRes.data.data;
    if (auRes.data.success)
        audit.value = auRes.data.data;
});
const severityColor = (s) => {
    switch (s) {
        case 'Critical': return 'badge-danger';
        case 'High': return 'badge-warning';
        case 'Medium': return 'badge-accent';
        default: return 'badge-primary';
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['practice-list']} */ ;
/** @type {__VLS_StyleScopedClasses['audit-section']} */ ;
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "section-title sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "arch-layers mb" },
});
for (const [layer] of __VLS_getVForSourceType((__VLS_ctx.architecture))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (layer.layer),
        ...{ class: "card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "card-title layer-title" },
    });
    (layer.layer);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "components" },
    });
    for (const [comp] of __VLS_getVForSourceType((layer.components))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (comp.name),
            ...{ class: "component" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
            ...{ class: "comp-name" },
        });
        (comp.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "comp-desc" },
        });
        (comp.description);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "tech-tags" },
        });
        for (const [t] of __VLS_getVForSourceType((comp.technologies))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                key: (t),
                ...{ class: "badge badge-primary" },
            });
            (t);
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "section-title sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pipeline mb" },
});
for (const [stage, i] of __VLS_getVForSourceType((__VLS_ctx.pipeline))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (stage.stage),
        ...{ class: "card pipeline-card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stage-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stage-num" },
    });
    (i + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "card-title" },
    });
    (stage.stage);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "card-desc" },
    });
    (stage.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: "mini-heading" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tech-tags mb-sm" },
    });
    for (const [t] of __VLS_getVForSourceType((stage.tools))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            key: (t),
            ...{ class: "badge badge-accent" },
        });
        (t);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: "mini-heading" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "practice-list" },
    });
    for (const [bp] of __VLS_getVForSourceType((stage.bestPractices))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (bp),
        });
        (bp);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "section-title sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid-2 mb" },
});
for (const [pattern] of __VLS_getVForSourceType((__VLS_ctx.patterns))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (pattern.name),
        ...{ class: "card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pattern-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "card-title" },
    });
    (pattern.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "badge badge-accent" },
    });
    (pattern.category);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "card-desc" },
    });
    (pattern.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mono impl" },
    });
    (pattern.implementation);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "when-box mt" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (pattern.when);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "section-title sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card" },
});
for (const [section] of __VLS_getVForSourceType((__VLS_ctx.audit))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (section.category),
        ...{ class: "audit-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "audit-category" },
    });
    (section.category);
    for (const [item] of __VLS_getVForSourceType((section.items))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (item.check),
            ...{ class: "audit-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "audit-check" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "audit-text" },
        });
        (item.check);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "badge" },
            ...{ class: (__VLS_ctx.severityColor(item.severity)) },
        });
        (item.severity);
    }
}
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['section-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['sm']} */ ;
/** @type {__VLS_StyleScopedClasses['arch-layers']} */ ;
/** @type {__VLS_StyleScopedClasses['mb']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['layer-title']} */ ;
/** @type {__VLS_StyleScopedClasses['components']} */ ;
/** @type {__VLS_StyleScopedClasses['component']} */ ;
/** @type {__VLS_StyleScopedClasses['comp-name']} */ ;
/** @type {__VLS_StyleScopedClasses['comp-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['sm']} */ ;
/** @type {__VLS_StyleScopedClasses['pipeline']} */ ;
/** @type {__VLS_StyleScopedClasses['mb']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['pipeline-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stage-header']} */ ;
/** @type {__VLS_StyleScopedClasses['stage-num']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['mini-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['mini-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-list']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['sm']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['pattern-header']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['mono']} */ ;
/** @type {__VLS_StyleScopedClasses['impl']} */ ;
/** @type {__VLS_StyleScopedClasses['when-box']} */ ;
/** @type {__VLS_StyleScopedClasses['mt']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['sm']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['audit-section']} */ ;
/** @type {__VLS_StyleScopedClasses['audit-category']} */ ;
/** @type {__VLS_StyleScopedClasses['audit-item']} */ ;
/** @type {__VLS_StyleScopedClasses['audit-check']} */ ;
/** @type {__VLS_StyleScopedClasses['audit-text']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            architecture: architecture,
            pipeline: pipeline,
            patterns: patterns,
            audit: audit,
            severityColor: severityColor,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
