<template>
  <q-page class="flex flex-center auth-page">
    <div class="auth-card">
      <div class="text-center q-mb-md">
        <h4 class="auth-title">Welcome Back</h4>
        <p class="auth-subtitle">Sign in to access MBRP AI Database</p>
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
          :rules="[val => !!val || 'Password is required']"
        />

        <div v-if="errorMsg" class="text-negative text-center q-mt-sm" style="font-size: 0.8rem;">
          {{ errorMsg }}
        </div>

        <div>
          <q-btn
            type="submit"
            label="Sign In"
            class="full-width glass-pill-btn auth-submit-btn"
            :loading="loading"
            unelevated
          />
        </div>
      </q-form>

      <div class="text-center q-mt-lg">
        <span class="text-grey-5" style="font-size: 0.85rem;">Don't have an account?</span>
        <q-btn flat dense no-caps label="Sign up" color="teal" to="/register" class="q-ml-sm" />
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
const loading = ref(false)
const errorMsg = ref('')

const onSubmit = async () => {
  loading.value = true
  errorMsg.value = ''
  
  const { error } = await supabase.auth.signInWithPassword({
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
      message: 'Successfully signed in!',
      icon: 'check'
    })
    router.push('/')
  }
}
</script>

<style lang="scss">
.auth-page {
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: rgba(20, 24, 40, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(42, 140, 140, 0.25);
  border-radius: 24px;
  padding: 40px 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  animation: fadeSlideIn 0.5s ease forwards;
}

.auth-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--ivory);
  margin: 0 0 8px 0;
}

.auth-subtitle {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.9rem;
  color: var(--mist);
  opacity: 0.7;
  margin: 0 0 24px 0;
}

.auth-input {
  .q-field__control {
    background: rgba(14, 14, 16, 0.6) !important;
    border-radius: 12px !important;
    border: 1px solid rgba(42, 140, 140, 0.2) !important;
    padding: 0 16px !important;
    transition: all 0.3s ease;
    
    &:before, &:after { display: none !important; }
  }

  &.q-field--focused .q-field__control {
    border-color: var(--teal) !important;
    box-shadow: 0 0 0 2px rgba(42, 140, 140, 0.1) !important;
  }

  .q-field__label {
    color: rgba(168, 216, 216, 0.6) !important;
  }
}

.auth-submit-btn {
  margin-top: 16px;
  border-radius: 12px !important;
  padding: 12px !important;
  font-size: 0.95rem !important;
  background: linear-gradient(135deg, rgba(42, 140, 140, 0.2), rgba(42, 140, 140, 0.05)) !important;
  border: 1px solid rgba(42, 140, 140, 0.4) !important;
  
  &:hover {
    background: rgba(42, 140, 140, 0.3) !important;
    border-color: var(--teal) !important;
    box-shadow: 0 0 15px var(--teal-glow) !important;
  }
}
</style>
