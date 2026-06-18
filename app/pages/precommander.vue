<script setup>
import { ref } from 'vue'

const selectedEdition = ref('deluxe') // 'base' or 'deluxe'
const selectedPayment = ref('card') // 'card' or 'paypal'
</script>

<template>
  <div class="min-h-screen bg-[#F3E7D3]">
    <!-- Header Section -->
    <section class="bg-[#2E150D] text-[#F3E7D3] pt-40 pb-56 px-6 text-center rounded-b-[60px] md:rounded-b-[100px]">
      <span class="text-[#BD652E] text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
        — Votre expédition commence
      </span>
      <h1 class="text-5xl md:text-6xl font-bold mb-6" style="font-family: Georgia, serif;">
        Finalisez votre <span class="italic">commande</span>
      </h1>
      <p class="text-sm md:text-base opacity-80 max-w-2xl mx-auto leading-relaxed">
        Préparez-vous à conquérir le marais. Choisissez votre édition et préparez votre équipement tactique.
      </p>
    </section>

    <!-- Content Section -->
    <section class="max-w-5xl mx-auto px-6 -mt-12 pb-32">
      <!-- Cards Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
        
        <!-- Base Edition Card -->
        <div 
          class="bg-white rounded-[40px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col relative transition-all"
          :class="selectedEdition === 'base' ? 'border-2 border-[#BD652E]' : 'border-2 border-transparent'"
        >
          <!-- Selected badge -->
          <div v-if="selectedEdition === 'base'" class="absolute -top-4 -right-4 bg-[#BD652E] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10">
            <Icon name="ph:check" class="w-5 h-5" stroke-width="3" />
          </div>

          <div class="rounded-3xl overflow-hidden mb-6 h-[280px] bg-gray-200 relative group cursor-pointer" @click="selectedEdition = 'base'">
            <img src="/images/page_commander/edition_base.png" alt="Édition Fondateur" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div class="px-2">
            <h2 class="text-2xl font-bold text-[#2E150D] mb-3" style="font-family: Georgia, serif;">Édition Fondateur (Base)</h2>
            <p class="text-[#2E150D]/70 text-sm mb-6 leading-relaxed flex-1">
              Le jeu original avec toutes les tuiles de base pour débuter votre aventure stratégique.
            </p>
            <ul class="space-y-3 mb-10">
              <li class="flex items-center gap-3 text-sm text-[#2E150D]">
                <Icon name="ph:check" class="w-4 h-4 text-[#BD652E]" />
                4 Expéditions de Grenouilles
              </li>
              <li class="flex items-center gap-3 text-sm text-[#2E150D]">
                <Icon name="ph:check" class="w-4 h-4 text-[#BD652E]" />
                Plateau modulaire (36 Tuiles)
              </li>
              <li class="flex items-center gap-3 text-sm text-[#2E150D]/40">
                <Icon name="ph:x" class="w-4 h-4" />
                <span class="text-[#2E150D]/40">Figurines en métal</span>
              </li>
            </ul>
            <div class="flex items-center justify-between mt-auto">
              <span class="text-2xl text-[#BD652E]" style="font-family: Georgia, serif;">45,00 €</span>
              <button 
                @click="selectedEdition = 'base'"
                :class="selectedEdition === 'base' ? 'bg-[#E7D3BE] text-[#2E150D]/80 cursor-default' : 'bg-[#BD652E] text-white hover:bg-[#A35222]'"
                class="px-8 py-3 rounded-full text-[11px] font-bold tracking-widest uppercase transition-colors"
              >
                {{ selectedEdition === 'base' ? 'Sélectionné' : 'Sélectionner' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Deluxe Edition Card -->
        <div 
          class="bg-white rounded-[40px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col relative transition-all"
          :class="selectedEdition === 'deluxe' ? 'border-2 border-[#BD652E]' : 'border-2 border-transparent'"
        >
          <!-- Selected badge -->
          <div v-if="selectedEdition === 'deluxe'" class="absolute -top-4 -right-4 bg-[#BD652E] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10">
            <Icon name="ph:check" class="w-5 h-5" stroke-width="3" />
          </div>

          <div class="rounded-3xl overflow-hidden mb-6 h-[280px] bg-gray-200 relative group cursor-pointer" @click="selectedEdition = 'deluxe'">
            <img src="/images/page_commander/edition_deluxe.png" alt="Édition Deluxe" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div class="px-2">
            <h2 class="text-2xl font-bold text-[#2E150D] mb-3" style="font-family: Georgia, serif;">Édition Deluxe</h2>
            <p class="text-[#2E150D]/70 text-sm mb-6 leading-relaxed flex-1">
              L'expérience ultime avec des matériaux premium et l'extension "Marais Maudit".
            </p>
            <ul class="space-y-3 mb-10">
              <li class="flex items-center gap-3 text-sm text-[#2E150D]">
                <Icon name="ph:check" class="w-4 h-4 text-[#BD652E]" />
                Figurines en métal sculptées
              </li>
              <li class="flex items-center gap-3 text-sm text-[#2E150D]">
                <Icon name="ph:check" class="w-4 h-4 text-[#BD652E]" />
                Extension Marais Maudit incluse
              </li>
              <li class="flex items-center gap-3 text-sm text-[#2E150D]">
                <Icon name="ph:check" class="w-4 h-4 text-[#BD652E]" />
                Sac de transport premium
              </li>
            </ul>
            <div class="flex items-center justify-between mt-auto">
              <span class="text-2xl text-[#BD652E]" style="font-family: Georgia, serif;">85,00 €</span>
              <button 
                @click="selectedEdition = 'deluxe'"
                :class="selectedEdition === 'deluxe' ? 'bg-[#E7D3BE] text-[#2E150D]/80 cursor-default' : 'bg-[#BD652E] text-white hover:bg-[#A35222]'"
                class="px-8 py-3 rounded-full text-[11px] font-bold tracking-widest uppercase transition-colors"
              >
                {{ selectedEdition === 'deluxe' ? 'Sélectionné' : 'Sélectionner' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Left Column: Forms -->
        <div class="lg:col-span-2 space-y-12">
          
          <!-- Shipping Info -->
          <div>
            <div class="flex items-center gap-4 mb-6">
              <div class="w-8 h-8 rounded-full bg-[#2E150D] text-[#F3E7D3] flex items-center justify-center font-bold font-serif">1</div>
              <h3 class="text-2xl text-[#2E150D]" style="font-family: Georgia, serif;">Informations de livraison</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold tracking-widest uppercase text-[#2E150D]/70 mb-2">Prénom</label>
                <input type="text" value="Sir" class="w-full bg-white rounded-lg px-4 py-3 text-[#2E150D] outline-none focus:ring-2 focus:ring-[#BD652E]/50" />
              </div>
              <div>
                <label class="block text-xs font-bold tracking-widest uppercase text-[#2E150D]/70 mb-2">Nom</label>
                <input type="text" value="Crooak" class="w-full bg-white rounded-lg px-4 py-3 text-[#2E150D] outline-none focus:ring-2 focus:ring-[#BD652E]/50" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-xs font-bold tracking-widest uppercase text-[#2E150D]/70 mb-2">Adresse</label>
                <input type="text" value="123 Avenue du Marais" class="w-full bg-white rounded-lg px-4 py-3 text-[#2E150D] outline-none focus:ring-2 focus:ring-[#BD652E]/50" />
              </div>
              <div>
                <label class="block text-xs font-bold tracking-widest uppercase text-[#2E150D]/70 mb-2">Ville</label>
                <input type="text" value="Nénuphar-sur-Seine" class="w-full bg-white rounded-lg px-4 py-3 text-[#2E150D] outline-none focus:ring-2 focus:ring-[#BD652E]/50" />
              </div>
              <div>
                <label class="block text-xs font-bold tracking-widest uppercase text-[#2E150D]/70 mb-2">Code Postal</label>
                <input type="text" value="75001" class="w-full bg-white rounded-lg px-4 py-3 text-[#2E150D] outline-none focus:ring-2 focus:ring-[#BD652E]/50" />
              </div>
            </div>
          </div>

          <!-- Payment Info -->
          <div>
            <div class="flex items-center gap-4 mb-6">
              <div class="w-8 h-8 rounded-full bg-[#2E150D] text-[#F3E7D3] flex items-center justify-center font-bold font-serif">2</div>
              <h3 class="text-2xl text-[#2E150D]" style="font-family: Georgia, serif;">Mode de paiement</h3>
            </div>
            
            <div class="space-y-4 mb-6">
              <!-- Credit Card Option -->
              <label 
                class="flex items-center justify-between bg-white rounded-lg p-4 cursor-pointer transition-colors"
                :class="selectedPayment === 'card' ? 'border-2 border-[#BD652E]' : 'border-2 border-transparent'"
                @click="selectedPayment = 'card'"
              >
                <div class="flex items-center gap-4">
                  <div 
                    class="w-5 h-5 rounded-full flex items-center justify-center bg-white transition-colors"
                    :class="selectedPayment === 'card' ? 'border-4 border-[#BD652E]' : 'border border-gray-300'"
                  ></div>
                  <div>
                    <div class="font-bold text-sm text-[#2E150D] tracking-widest uppercase">Carte de crédit</div>
                    <div class="text-xs text-[#2E150D]/60">Visa, Mastercard, Amex</div>
                  </div>
                </div>
                <Icon name="ph:credit-card" class="w-6 h-6 text-[#2E150D]/70" />
              </label>

              <!-- PayPal Option -->
              <label 
                class="flex items-center justify-between bg-white rounded-lg p-4 cursor-pointer transition-colors"
                :class="selectedPayment === 'paypal' ? 'border-2 border-[#BD652E]' : 'border-2 border-transparent'"
                @click="selectedPayment = 'paypal'"
              >
                <div class="flex items-center gap-4">
                  <div 
                    class="w-5 h-5 rounded-full flex items-center justify-center bg-white transition-colors"
                    :class="selectedPayment === 'paypal' ? 'border-4 border-[#BD652E]' : 'border border-gray-300'"
                  ></div>
                  <div>
                    <div class="font-bold text-sm text-[#2E150D] tracking-widest uppercase">PayPal</div>
                    <div class="text-xs text-[#2E150D]/60">Paiement rapide et sécurisé</div>
                  </div>
                </div>
                <Icon name="ph:paypal-logo" class="w-6 h-6 text-[#2E150D]/70" />
              </label>
            </div>

            <!-- Card Details -->
            <div v-if="selectedPayment === 'card'" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-down animate-duration-300">
              <div class="md:col-span-2">
                <label class="block text-xs font-bold tracking-widest uppercase text-[#2E150D]/70 mb-2">Numéro de carte</label>
                <input type="text" placeholder="0000 0000 0000 0000" class="w-full bg-white rounded-lg px-4 py-3 text-[#2E150D] outline-none focus:ring-2 focus:ring-[#BD652E]/50" />
              </div>
              <div>
                <label class="block text-xs font-bold tracking-widest uppercase text-[#2E150D]/70 mb-2">Date d'expiration</label>
                <input type="text" placeholder="MM / YY" class="w-full bg-white rounded-lg px-4 py-3 text-[#2E150D] outline-none focus:ring-2 focus:ring-[#BD652E]/50" />
              </div>
              <div>
                <label class="block text-xs font-bold tracking-widest uppercase text-[#2E150D]/70 mb-2">CVC</label>
                <input type="text" placeholder="123" class="w-full bg-white rounded-lg px-4 py-3 text-[#2E150D] outline-none focus:ring-2 focus:ring-[#BD652E]/50" />
              </div>
            </div>

            <!-- PayPal Message -->
            <div v-else class="bg-white rounded-lg p-8 text-center text-[#2E150D]/70 text-sm animate-fade-up animate-duration-300">
              <Icon name="ph:paypal-logo" class="w-12 h-12 text-[#BD652E] mx-auto mb-4 opacity-50" />
              Vous serez redirigé vers la plateforme sécurisée de PayPal pour finaliser votre paiement une fois la commande confirmée.
            </div>

          </div>
        </div>

        <!-- Right Column: Summary -->
        <div class="lg:col-span-1">
          <div class="bg-[#2E150D] rounded-[32px] p-8 text-[#F3E7D3] sticky top-32 shadow-2xl">
            <h3 class="text-2xl mb-8" style="font-family: Georgia, serif;">Récapitulatif</h3>
            
            <div class="space-y-4 text-sm opacity-90 mb-8 border-b border-white/10 pb-8">
              <div class="flex justify-between items-center">
                <span>{{ selectedEdition === 'deluxe' ? 'Édition Deluxe (x1)' : 'Édition Fondateur (x1)' }}</span>
                <span>{{ selectedEdition === 'deluxe' ? '85,00' : '45,00' }} €</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Livraison standard</span>
                <span class="text-[#BD652E]">Gratuit</span>
              </div>
              <div class="flex justify-between items-center opacity-70">
                <span>Taxes (TVA 20%)</span>
                <span>{{ selectedEdition === 'deluxe' ? '14,16' : '7,50' }} €</span>
              </div>
            </div>

            <div class="flex justify-between items-end mb-2">
              <span class="text-lg">Total</span>
              <span class="text-3xl text-[#BD652E]" style="font-family: Georgia, serif;">{{ selectedEdition === 'deluxe' ? '85,00' : '45,00' }} €</span>
            </div>
            <div class="text-[10px] opacity-50 mb-8 text-right">
              Le montant total inclut la TVA applicable.
            </div>

            <button class="w-full bg-[#BD652E] hover:bg-[#A35222] text-[#F3E7D3] px-6 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-colors flex justify-center items-center gap-2 shadow-lg mb-4">
              <Icon name="ph:lock-key" class="w-4 h-4" />
              Confirmer la commande
            </button>
            <div class="text-[10px] opacity-50 text-center tracking-widest uppercase flex items-center justify-center gap-1 mb-8">
              <Icon name="ph:shield-check" class="w-3 h-3" />
              Paiement 100% Sécurisé
            </div>

            <!-- Bonus Banner -->
            <div class="bg-[#2E150D] rounded-2xl p-4 flex gap-3 border border-white/5">
              <div class="mt-1">
                <Icon name="ph:gift" class="w-5 h-5 text-[#BD652E]" />
              </div>
              <div>
                <div class="text-xs font-bold tracking-widest uppercase mb-1">Bonus Fondateur</div>
                <div class="text-[10px] opacity-70 leading-relaxed">
                  Vous recevrez le set de cartes "Reliques Royales" en exclusivité pour toute précommande.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>
