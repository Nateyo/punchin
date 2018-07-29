<template>
  <v-card v-if="resetme">
    <v-card-title>
      Please select an image to be used.
    </v-card-title>
    <v-card-text>
      <div id='fileinput'>
        <input type="file" v-on:change="photoUploaded">
      </div>
      <v-layout row wrap>
        <v-flex d-flex>
          <div id="editor">
            <img id="photo_orig">
          </div>
        </v-flex>
        <v-flex d-flex>
          <div id="preview"></div>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!cropper" @click="save">Save</v-btn>
      <v-btn color="error" @click.native="cancel">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Cropper from 'cropperjs'
let member_func = require('../../db/func/members').default

export default {
  name: 'EditPhoto',
  props: ['member'],
  data () {
    return {
      resetme: true,
      cropper: null
    }
  },
  methods: {
    photoUploaded: function (event) {
      let reader = new FileReader()
      reader.onloadend = (event) => {
        let img = document.getElementById('photo_orig')
        img.src = event.target.result
        img.onload = () => {
          this.cropper = new Cropper(img, {
            aspectRatio: 1,
            crop (event) {
              let preview = this.cropper.getCroppedCanvas({
                width: 200,
                height: 200,
                fillColor: '#fff',
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high'
              })

              let preview_canvas = document.getElementById('preview')
              preview_canvas.innerHTML = ''
              preview_canvas.appendChild(preview)
            }
          })
        }
      }
      reader.readAsDataURL(event.target.files[0])
    },
    getCroppedPhoto: function () {
      return this.cropper.getCroppedCanvas({
        width: 200,
        height: 200,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
      }).toDataURL('image/png')
    },
    save: function () {
      if (this.cropper != null) {
        this.member.picture = this.getCroppedPhoto()
        member_func.update(this.member, ['picture']).then(member => {
          this.reset()
          this.$emit('updated', member)
        })
          .catch(function (err) {
            this.reset()
            this.$emit('updated', err)
          })
      }
    },
    cancel: function () {
      this.reset()
      this.$emit('cancel')
    },
    reset: function () {
      this.resetme = false
      this.$nextTick(() => {
        this.resetme = true
      })
    }
  }
}
</script>

<style lang='scss'>
img {
  max-width: 100%;
}
</style>