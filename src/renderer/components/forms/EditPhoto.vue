<template>
  <v-card>
    <v-card-title>
      Please select an image to be used.
    </v-card-title>
    <v-card-text>
      <div>
        <input type="file" v-on:change="photoUploaded">
      </div>
      <v-layout row wrap>
        <v-flex d-flex>
          <div>
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
      <v-btn color="primary" @click="save">Save</v-btn>
      <v-btn color="error" @click.native="cancel">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Cropper from 'cropperjs'

export default {
  name: 'EditPhoto',
  data () {
    return {
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
    cropPhoto: function () {
      let dataurl = this.cropper.getCroppedCanvas({
        width: 200,
        height: 200,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
      }).toDataURL('image/png')

      this.$emit('updated', dataurl)
    },
    save: function () {
      if (this.$refs.edit_profile_form.validate()) {
        this.member.first_name = this.first_name
        this.member.middle_name = this.middle_name
        this.member.last_name = this.last_name
        member_func.update(this.member).then(member => {
          this.$refs.edit_profile_form.reset()
          this.selected_role = 0
          this.$emit('updated', member)
        })
          .catch(function (err) {
            this.$refs.edit_profile_form.reset()
            this.selected_role = 0
            this.$emit('updated', err)
          })
      }
    },
    cancel: function () {
      this.$refs.edit_profile_form.reset()
      this.selected_role = 0
      this.$emit('cancel')
    }
  }
}
</script>

<style lang='scss'>
img {
  max-width: 100%; /* This rule is very important, please do not ignore this! */
}
</style>