<script>
    export default {
    data() {
        return {
            navOpen: false,
        }
    },
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
            <li class="sidemenu__item"><a href="">Logout</a></li>
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
		width: 140px;
		background: rgb(0, 128, 255);
		position: fixed;
		top: 4rem;
		right: 0;
		z-index: 99;

	}
	.sidemenu {
		&__btn {
			display: block;
			width: 40px;
			height: 40px;
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
				width: 20px;
				height: 3px;
				margin: auto;
				background: rgb(0, 128, 255);
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				transition: all .4s ease;

				&.top {
					transform: translateY(-8px);
				}

				&.bottom {
					transform: translateY(8px);
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

		&__wrapper {
      padding-top: 5px;
    }

		&__list {
			padding-top: 50px;
      list-style:none;
      padding: 0;
      margin: 0;
		}

		&__item {
			a {
        text-decoration: none;
				line-height: 1.6em;
				font-size: 1.6em;
				padding: .5em;
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
