<script>
import { mapActions } from 'pinia';
import { useGlobalStore } from '../stores/globalStore';

    export default {
    data() {
        return {
            navOpen: false,
        }
    },
	methods: {
		...mapActions(useGlobalStore, ['logoutUser'])
	}
}
</script>

<template>
  <div id="sidemenu">
    <button class="sidemenu__btn" v-on:click="navOpen=!navOpen" v-bind:class="{active:navOpen}">
				<span class="top"></span>
				<span class="mid"></span>
				<span class="bottom"></span>
			</button>
    <transition name="translateX">
      <nav v-show="navOpen">
        <div class="sidemenu__wrapper">
          <ul class="sidemenu__list">
            <li class="sidemenu__item"><a href="">Settings</a></li>
            <li class="sidemenu__item"><a href="">About</a></li>
            <li class="sidemenu__item"><a href="" @click="logoutUser">Logout</a></li>
          </ul>
        </div>
      </nav>
    </transition>
  </div>
</template>
<style scoped lang="scss">

#sidemenu {
    margin-right: 1rem;
	nav {
		width: 235px;
		background: #535981;
		position: fixed;
		top: 48px;
		right: 0;
		z-index: 99;

	}
	.sidemenu {
		&__btn {
			display: block;
			width: 30px;
			height: 30px;
			background: white;
            border-radius: 10px;
			border: none;
			position: relative;
			z-index: 100;
			appearance: none;
			cursor: pointer;
			outline: none;

			span {
				display: block;
				width: 18px;
				height: 2px;
				margin: auto;
				background: #535981;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				transition: all .4s ease;

				&.top {
					transform: translateY(-6px);
				}

				&.bottom {
					transform: translateY(6px);
				}
			}
			&.active{
				.top {
					transform: rotate(-45deg);
				}
				.mid{
					transform: translateX(-20px) rotate(360deg);
					opacity: 0;
				}
				.bottom {
					transform: rotate(45deg);
				}
			}

		}

		&__list {
      list-style:none;
      padding: 0;
      margin: 0;
		}

		&__item {
			a {
        text-decoration: none;
				line-height: 1.6em;
				font-size: 1.2em;
				font-weight: 400;
				padding: .5em;
				padding-left: 1em;
				display: block;
				color: white;
				transition: .4s ease;

				&:hover {
					background: lightgrey;
					color: dimgrey;
				}
			}
		}
	}
}

.translateX-enter{
	transform:translateX(-200px);
	opacity: 0;
}

.translateX-enter-active,.translateX-leave-active{
	transform-origin: top left 0;
	transition:.2s ease;
}

.translateX-leave-to{
	transform: translateX(-200px);
	opacity: 0;
}

</style>
