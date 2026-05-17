<template>
  <q-page class="flex flex-center auth-page">
    <div class="auth-card">
      <div class="text-center q-mb-md">
        <h4 class="auth-title">Create Account</h4>
        <p class="auth-subtitle">Join the MBRP AI Database</p>
      </div>

      <q-form @submit="onSubmit" class="q-gutter-md auth-form">
        <q-input
          v-model="email"
          type="email"
          label="Email address"
          dark
          color="teal"
          class="auth-input"
          dense
          borderless
          :rules="[val => !!val || 'Email is required']"
        />

        <q-input
          v-model="password"
          type="password"
          label="Password"
          dark
          color="teal"
          class="auth-input"
          dense
          borderless
          :rules="[
            val => !!val || 'Password is required',
            val => val.length >= 6 || 'Password must be at least 6 characters'
          ]"
        />

        <q-input
          v-model="confirmPassword"
          type="password"
          label="Confirm Password"
          dark
          color="teal"
          class="auth-input"
          dense
          borderless
          :rules="[
            val => !!val || 'Please confirm your password',
            val => val === password || 'Passwords do not match'
          ]"
        />

        <div v-if="errorMsg" class="text-negative text-center q-mt-sm" style="font-size: 0.8rem;">
          {{ errorMsg }}
        </div>

        <div>
          <q-btn
            type="submit"
            label="Sign Up"
            class="full-width glass-pill-btn auth-submit-btn"
            :loading="loading"
            unelevated
          />
        </div>
      </q-form>

      <div class="text-center q-mt-lg">
        <span class="text-grey-5" style="font-size: 0.85rem;">Already have an account?</span>
        <q-btn flat dense no-caps label="Sign in" color="teal" to="/login" class="q-ml-sm" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from 'boot/supabase'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMsg = ref('')

const onSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match.'
    return
  }

  loading.value = true
  errorMsg.value = ''
  
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  loading.value = false

  if (error) {
    errorMsg.value = error.message
    $q.notify({
      color: 'negative',
      message: error.message,
      icon: 'report_problem'
    })
  } else {
    $q.notify({
      color: 'positive',
      message: 'Registration successful! Please check your email to confirm.',
      icon: 'check',
      timeout: 5000
    })
    // Supabase auto-logins after signup if email confirmation is disabled, 
    // otherwise they need to confirm. For now, redirect to home or login.
    router.push('/')
  }
}
</script>
