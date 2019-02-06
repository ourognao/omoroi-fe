<template lang="pug">
v-container#privacy-policy-index-main(fluid)
  v-layout(row class="border-blue-bottom").pb-1
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('privacy-policy.index.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('privacy-policy.index.introduction.i01') }}
  
  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('privacy-policy.index.article1.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article1.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article1.explanation.i02') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('privacy-policy.index.article2.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article2.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article2.explanation.i02') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('privacy-policy.index.article3.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article3.explanation.i01') }}
    v-layout.mt-2(row)
      ul.no-bullets
        li {{ $t('privacy-policy.index.article3.explanation.i02') }}
        li {{ $t('privacy-policy.index.article3.explanation.i03') }}
        li {{ $t('privacy-policy.index.article3.explanation.i04') }}
        li {{ $t('privacy-policy.index.article3.explanation.i05') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('privacy-policy.index.article4.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article4.explanation.i01') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('privacy-policy.index.article5.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article5.explanation.i01') }}
    v-layout.mt-2(row)
      ul.no-bullets
        li {{ $t('privacy-policy.index.article5.explanation.i02') }}
        li {{ $t('privacy-policy.index.article5.explanation.i03') }}
        li {{ $t('privacy-policy.index.article5.explanation.i04') }}
        li {{ $t('privacy-policy.index.article5.explanation.i05') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('privacy-policy.index.article6.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article6.explanation.i01') }}
    v-layout.mt-2(row)
      ul.no-bullets
        li {{ $t('privacy-policy.index.article6.explanation.i02') }}
        li {{ $t('privacy-policy.index.article6.explanation.i03') }}
        li {{ $t('privacy-policy.index.article6.explanation.i04') }}
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article6.explanation.i05') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('privacy-policy.index.article7.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article7.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article7.explanation.i02') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('privacy-policy.index.article8.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article8.explanation.i01') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('privacy-policy.index.article9.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article9.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article9.explanation.i02') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('privacy-policy.index.article10.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article10.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article10.explanation.i02') }}
    v-layout.mt-2(row) {{ $t('privacy-policy.index.article10.explanation.i03') }}

  
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#privacy-policy-index-main
  .no-bullets
    list-style-type none
</style>

<!-- ============================================================================ -->

<script>
</script>
