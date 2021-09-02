<template>
    <div class="uk-slider-container-offset uk-align-center" style="width: 100%;" uk-slider>
        <h2 class="title" >Актуальные каталоги</h2>
    <div class="uk-position-relative uk-visible-toggle" tabindex="-1">

        <ul class="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid">
            <li>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="http://orinice.pp.ua/static/720p/avif/1629197965140.avif" alt="">
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">Каталог №1</h3>
                        <p>Период действия 31.05.2021 - 19.06.2021</p>
                        <p>
                            <button class="uk-button uk-button-secondary uk-align-center">Подробнее</button>
                        </p>
                    </div>
                </div>
            </li>
            <li>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="http://orinice.pp.ua/static/720p/avif/1629197965140.avif" alt="">
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">Каталог №1</h3>
                        <p>Период действия 31.05.2021 - 19.06.2021</p>
                        <p>
                            <button class="uk-button uk-button-secondary uk-align-center">Подробнее</button>
                        </p>
                    </div>
                </div>
            </li>
            <li>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="http://orinice.pp.ua/static/720p/avif/1629197965140.avif" alt="">
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">Каталог №1</h3>
                        <p>Период действия 31.05.2021 - 19.06.2021</p>
                        <p>
                            <button class="uk-button uk-button-secondary uk-align-center">Подробнее</button>
                        </p>
                    </div>
                </div>
            </li>
            <li>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="http://orinice.pp.ua/static/720p/avif/1629197965140.avif" alt="">
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">Каталог №1</h3>
                        <p>Период действия 31.05.2021 - 19.06.2021</p>
                        <p>
                            <button class="uk-button uk-button-secondary uk-align-center">Подробнее</button>
                        </p>
                    </div>
                </div>
            </li>
        </ul>

        <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>

    </div>

    <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>

</div>
</template>

<script>
export default {
    name: 'CatalogSlider'
}
</script>
<style scoped>
.title { 
    text-align: center;
    margin: 15px;
    margin-bottom: 50px;
    font-size: 2em;
    text-transform: uppercase;
}
</style>