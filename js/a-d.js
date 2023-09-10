'use strict';

/**
 * Micro library for detecting adblock on user page
 *
 * @class AdblockDetector
 */
class AdblockDetector {
    constructor() {
        this.bannerIds = ['AdHeader', 'AdContainer', 'AD_Top', 'homead', 'ad-lead'];
        this.init();
    }

    /**
     * Init library - add some tags to page with ads ids
     *
     * @returns {void} create detector instance
     * @memberof AdblockDetector
     */
    init() {
        if (!this.isBrowser()) {
            console.error('Detection on server side is not supported. Please use library only on client side.');
            return;
        }

        const dataContainer = document.createElement('div');
        dataContainer.innerHTML = this.generatesBannersString();
        document.body.append(dataContainer);
    }

    /**
     * Check enabling adblock
     *
     * @returns {Boolean} Status adblock enabling
     * @memberof AdblockDetector
     */
    detect() {
        return !this.isBrowser() ? false : !this.bannerIds.every((bannerId) => this.checkVisibility(bannerId));
    }

    /**
     * Generate all ads blocks from ids dictionary
     *
     * @returns {String} Ads blocks
     * @private
     * @memberof AdblockDetector
     */
    generatesBannersString() {
        return this.bannerIds.map((bannerId) => `<div id="${bannerId}"></div>`).join('');
    }

    /**
     * Check visibility by banner id
     *
     * @param {Number} bannerId
     * @returns {HTMLElement|null} Return banners if adblock is not enabled
     * @private
     * @memberof AdblockDetector
     */
    checkVisibility(bannerId) {
        const element = document.querySelector(`#${bannerId}`);
        if (element) {
            return element.offsetParent;
        }
        return null;
    }

    isBrowser() {
        return typeof window !== 'undefined';
    }
}
