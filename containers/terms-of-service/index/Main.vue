<template lang="pug">
v-container#terms-of-service-index-main(fluid)
  v-layout(row class="border-blue-bottom").pb-1
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.introduction.i01') }}
  
  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term1.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term1.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term1.explanation.i02') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term1.explanation.i03') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term2.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term2.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term2.explanation.i02') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term3.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term3.explanation.i01') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term4.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term4.explanation.i01') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term5.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term5.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term5.explanation.i02') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term5.explanation.i03') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term6.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term6.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term6.explanation.i02') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term6.explanation.i03') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term6.explanation.i04') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term6.explanation.i05') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term6.explanation.i06') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term7.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term7.explanation.i01') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term8.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term8.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term8.explanation.i02') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term8.explanation.i03') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term8.explanation.i04') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term8.explanation.i05') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term8.explanation.i06') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term9.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term9.explanation.i01') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term10.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term10.explanation.i01') }}
    v-layout.mt-2(row)
      ul
        li {{ $t('terms-of-service.index.term10.explanation.i02') }}
        li {{ $t('terms-of-service.index.term10.explanation.i03') }}
        li {{ $t('terms-of-service.index.term10.explanation.i04') }}
        li {{ $t('terms-of-service.index.term10.explanation.i05') }}
        li {{ $t('terms-of-service.index.term10.explanation.i06') }}
        li {{ $t('terms-of-service.index.term10.explanation.i07') }}
        li {{ $t('terms-of-service.index.term10.explanation.i08') }}
        li {{ $t('terms-of-service.index.term10.explanation.i09') }}
        li {{ $t('terms-of-service.index.term10.explanation.i10') }}
        li {{ $t('terms-of-service.index.term10.explanation.i11') }}
        li {{ $t('terms-of-service.index.term10.explanation.i12') }}
        li {{ $t('terms-of-service.index.term10.explanation.i13') }}
        li {{ $t('terms-of-service.index.term10.explanation.i14') }}
        li {{ $t('terms-of-service.index.term10.explanation.i15') }}
        li {{ $t('terms-of-service.index.term10.explanation.i16') }}
        li {{ $t('terms-of-service.index.term10.explanation.i17') }}
        li {{ $t('terms-of-service.index.term10.explanation.i18') }}
        li {{ $t('terms-of-service.index.term10.explanation.i19') }}
        li {{ $t('terms-of-service.index.term10.explanation.i20') }}
        li {{ $t('terms-of-service.index.term10.explanation.i21') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term11.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term11.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term11.explanation.i02') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term11.explanation.i03') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term11.explanation.i04') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term12.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term12.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term12.explanation.i02') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term12.explanation.i03') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term12.explanation.i04') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term12.explanation.i05') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term12.explanation.i06') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term12.explanation.i07') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term12.explanation.i08') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term12.explanation.i09') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term12.explanation.i10') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term13.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term13.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term13.explanation.i02') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term14.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term14.explanation.i01') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term15.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term15.explanation.i01') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term16.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term16.explanation.i01') }}
    v-layout.mt-2(row)
      ul
        li {{ $t('terms-of-service.index.term16.explanation.i02') }}
        li {{ $t('terms-of-service.index.term16.explanation.i03') }}
        li {{ $t('terms-of-service.index.term16.explanation.i04') }}
        li {{ $t('terms-of-service.index.term16.explanation.i05') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term17.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term17.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term17.explanation.i02') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term18.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term18.explanation.i01') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term18.explanation.i02') }}
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term18.explanation.i03') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term19.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term19.explanation.i01') }}

  v-layout(row class="border-blue-bottom").pb-1.pt-3
    v-flex.caption(xs12)
      v-icon.mb-1(class="icon-blue more-ajusted icons events") panorama_fish_eye
      span {{ $t('terms-of-service.index.term20.title') }}
  div(class="details")
    v-layout.mt-2(row) {{ $t('terms-of-service.index.term20.explanation.i01') }}
  
</template>

<!-- ============================================================================ -->

<style lang="stylus">
#terms-of-service-index-main
  .no-bullets
    list-style-type none
</style>

<!-- ============================================================================ -->

<script>
</script>
