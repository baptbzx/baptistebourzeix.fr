export const Logo = () => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="182.9px" height="184.5px" viewBox="0 0 182.9 184.5" className="logo h-[10vw] w-[10vw]" xmlSpace="preserve">
        <defs>
            <filter id="glitchshadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="0" result="blur"></feGaussianBlur>
                <feOffset dx="0" dy="0" result="offsetblur">
                    <animate
                        attributeName="dx"
                        from="0"
                        to="0"
                        begin="0s"
                        dur="0.1s"
                        repeatCount="indefinite"
                        values        = "-5;-2;-2;-2;5;0"
                        keyTimes      = "0;0.125;0.275;0.625;0.875;1"
                    ></animate>
                    <animate
                        attributeName="dy"
                        from="0"
                        to="0"
                        begin="0s"
                        dur="0.1s"
                        repeatCount="indefinite"
                        values        = "1;1.5;3;1.7;-1.7;0"
                        keyTimes      = "0;0.125;0.275;0.625;0.875;1"
                    ></animate>
                </feOffset>
                <feOffset dx="60" dy="-12" result="offsetblur2" in="blur">
                    <animate
                        attributeName="dx"
                        from="0"
                        to="0"
                        begin="0s"
                        dur="0.1s"
                        repeatCount="indefinite"
                        values        = "0;5;-2;-2;-2;-5"
                        keyTimes      = "0;0.125;0.275;0.625;0.875;1"
                    ></animate>
                    <animate
                        attributeName="dy"
                        from="0"
                        to="0"
                        begin="0s"
                        dur="0.1s"
                        repeatCount="indefinite"
                        values        = "0;-1.7;1.7;-3;1.5;1"
                        keyTimes      = "0;0.125;0.275;0.625;0.875;1"
                    ></animate>
                </feOffset>
                <feComponentTransfer result="shadow1" in="offsetblur">
                    <feFuncA type="linear" slope=".8"></feFuncA>
                    <feFuncR type="discrete" tableValues="0"></feFuncR>/>
                    <feFuncG type="discrete" tableValues="1"></feFuncG>/>
                    <feFuncB type="discrete" tableValues="1"></feFuncB>/>
                </feComponentTransfer>
                <feComponentTransfer result="shadow2" in="offsetblur2">
                    <feFuncA type="linear" slope=".8"></feFuncA>/>
                    <feFuncR type="discrete" tableValues="1"></feFuncR>/>
                    <feFuncG type="discrete" tableValues="0"></feFuncG>/>
                    <feFuncB type="discrete" tableValues="1"></feFuncB>/>
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode in="shadow1"></feMergeNode>/>
                    <feMergeNode in="shadow2"></feMergeNode>/>
                    <feMergeNode in="SourceGraphic"></feMergeNode>/>
                </feMerge>
            </filter>
        </defs>
        <g className="logo-spin animate-[spin_30s_linear_infinite] origin-center" id="XMLID_7_">
	<path id="XMLID_95_" className="fill-white" d="M13.6,79.3l-13-2.8c-0.5-0.1-0.6-0.5-0.6-0.9C0.1,75.2,0.5,75,0.9,75l5.2,1.1
		c-0.6-1-0.7-1.8-0.6-2.6c0.6-2.7,2.8-4.1,5.3-3.6l1,0.2c2.4,0.5,3.9,2.8,3.4,5c-0.2,1.1-0.8,1.9-1.7,2.6l0.3,0.1
		c0.4,0.1,0.7,0.5,0.6,0.9C14.4,79.1,14.1,79.4,13.6,79.3z M11.5,71.6l-1-0.2c-1.7-0.4-3.1,0.6-3.4,2.1s0.7,3,2.3,3.3l1,0.2
		c1.6,0.4,3.1-0.6,3.4-2.1C14.1,73.5,13.1,72,11.5,71.6z"></path>
    <path id="XMLID_92_" className="fill-white" d="M14.2,67.8c-1.7-0.6-2.2-2.3-1.6-4.1c0.8-2.2,1.1-2.9,1-3.3c-0.1-0.3-0.2-0.4-0.5-0.5
		c-0.8-0.3-2,0.4-2.6,1.7c-0.4,1-0.3,2.1,0.4,2.9c0.2,0.2,0.3,0.4,0.2,0.7c-0.1,0.4-0.5,0.6-0.9,0.4c-1.2-0.5-1.6-3-0.9-4.7
		c0.7-1.7,2.6-3.1,4.3-2.4l5.6,2.1c0.4,0.2,0.5,0.6,0.4,0.9c-0.1,0.4-0.5,0.5-0.9,0.4l-0.9-0.3c0.8,1.3,0.6,2.9,0.2,4.1
		C17.3,67.7,15.8,68.4,14.2,67.8z M15.5,60.8l-0.9-0.3c0.1,0.8-0.2,1.5-0.9,3.4c-0.4,1.2-0.2,2.1,0.8,2.5c1.1,0.4,1.8-0.2,2.2-1.4
		C17.5,63.1,17.2,61.4,15.5,60.8z"></path>
    <path id="XMLID_89_" className="fill-white" d="M24.7,59.7l-11.3-6.4c-0.4-0.2-0.5-0.7-0.3-1c0.2-0.3,0.7-0.5,1-0.3l0.8,0.5
		c-0.6-1.2-0.6-2.3,0-3.5c1.1-1.9,3.8-2.6,5.9-1.4l0.9,0.5c2.1,1.2,3,3.7,1.9,5.6c-0.6,1.1-1.6,1.7-3,1.9l4.9,2.7
		c0.4,0.2,0.5,0.7,0.3,1C25.5,59.8,25.1,60,24.7,59.7z M20.9,49.5L20.1,49c-1.3-0.7-3.1-0.4-3.9,1c-0.8,1.4-0.2,3.1,1.2,3.9l0.9,0.5
		c1.4,0.8,3.1,0.3,3.9-1C22.9,52,22.3,50.3,20.9,49.5z"></path>
    <path id="XMLID_87_" className="fill-white" d="M25.2,44.4l-3.9-3l-1.1,1.4c-0.3,0.4-0.7,0.4-1,0.2c-0.3-0.2-0.3-0.6-0.1-1l1.1-1.4l-2.2-1.7
		c-0.3-0.3-0.4-0.7-0.1-1.1s0.7-0.4,1.1-0.1l2.2,1.7l3.1-4c0.3-0.4,0.7-0.4,1-0.2c0.3,0.2,0.4,0.6,0.1,1l-3.1,4l3.9,3
		c0.9,0.7,2.3,0.6,3.1-0.3c0.7-1,0.5-2.3-0.4-3.1c-0.3-0.3-0.4-0.7-0.1-1c0.2-0.3,0.7-0.4,1-0.1c1.6,1.2,2,3.5,0.7,5.1
		C29.2,45.4,26.9,45.6,25.2,44.4z"></path>
    <path id="XMLID_84_" className="fill-white" d="M28,27.5c-0.5-0.5-0.5-1.3,0-1.7c0.6-0.5,1.3-0.4,1.8,0.1c0.5,0.5,0.5,1.2,0,1.7
		C29.2,28.1,28.4,28,28,27.5z M33.7,38.6c-0.3-0.3-0.3-0.8,0-1.1l2.5-2.4l-4.7-4.9L29,32.6c-0.3,0.3-0.8,0.3-1.1,0
		c-0.3-0.3-0.3-0.8,0-1.1l3-2.9c0.3-0.3,0.8-0.3,1.1,0l5.3,5.5l2-1.9c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1l-5.6,5.3
		C34.5,38.9,34,38.9,33.7,38.6z"></path>
    <path id="XMLID_82_" className="fill-white" d="M42,29.8c-0.4-0.1-0.6-0.2-0.6-0.8c0.1-0.4,0.4-0.7,0.9-0.6c1.4,0.3,2.3,0,3.3-0.7
		c1.1-0.8,1.9-1.8,1.2-2.8c-0.7-1-1.8-0.3-2.9,0.4c-1.7,1-3.5,2.1-4.9,0.1c-1.1-1.5-0.5-3.2,1.3-4.5c1.3-0.9,2.7-1.2,3.8-1.1
		c0.2,0,0.4,0.1,0.5,0.3c0.2,0.3,0.1,0.8-0.2,1c-0.2,0.1-0.4,0.1-0.6,0.1c-1.1-0.1-1.9,0.2-2.8,0.8c-1,0.7-1.6,1.5-1,2.4
		c0.6,0.8,1.5,0.5,2.9-0.3c1.3-0.8,3.6-2.2,5-0.2c1.1,1.6,0.3,3.4-1.5,4.7C46,29.1,43.9,30.4,42,29.8z"></path>
    <path id="XMLID_80_" className="fill-white" d="M52.2,20.8L50,16.4l-1.6,0.8c-0.4,0.2-0.8,0.1-0.9-0.3c-0.2-0.3,0-0.7,0.4-0.9l1.6-0.8
		l-1.3-2.5c-0.2-0.4-0.1-0.8,0.3-1c0.4-0.2,0.8,0,1,0.3l1.2,2.5l4.5-2.3c0.4-0.2,0.8,0,0.9,0.3c0.2,0.4,0,0.7-0.3,0.9l-4.5,2.3
		l2.2,4.4c0.5,1.1,1.8,1.6,2.9,1c1.1-0.5,1.5-1.9,0.9-2.9c-0.2-0.4,0-0.8,0.3-1c0.4-0.2,0.8,0,1,0.3c0.9,1.8,0.2,4-1.6,4.9
		C55.3,23.4,53.1,22.6,52.2,20.8z"></path>
    <path id="XMLID_77_" className="fill-white" d="M61.5,15.8l-0.4-1.2c-0.7-2.3,0.4-4.7,2.8-5.5c2.5-0.8,4.7,0.7,5.5,3.2c0.2,0.6-0.1,0.9-0.4,1
		l-6.1,2c0.5,1.5,2.1,2.2,3.6,1.8c1.2-0.4,1.5-1.3,1.8-2.2c0.1-0.2,0.2-0.5,0.5-0.6c0.4-0.1,0.8,0.1,0.9,0.4c0,0.1,0.1,0.3,0,0.5
		c-0.1,1.2-1.2,2.8-2.9,3.3C64.7,19.3,62.2,18,61.5,15.8z M67.7,12.2c-0.8-1.6-2.1-2.1-3.4-1.7c-1.5,0.5-2.3,2-1.9,3.4L67.7,12.2z"></path>
    <path id="XMLID_74_" className="fill-white" d="M85.4,14.1L85.1,0.8c0-0.5,0.4-0.8,0.7-0.8c0.4,0,0.8,0.3,0.8,0.7L86.7,6
		c0.8-0.8,1.6-1.1,2.4-1.2c2.8-0.1,4.6,1.8,4.7,4.3l0,1.1c0.1,2.4-1.8,4.5-4.1,4.5c-1.1,0-2.1-0.3-2.9-1l0,0.3
		c0,0.4-0.3,0.8-0.7,0.8C85.8,14.8,85.4,14.5,85.4,14.1z M92.4,10.3l0-1.1c0-1.7-1.3-2.9-2.9-2.9c-1.5,0-2.7,1.3-2.7,3l0,1.1
		c0,1.7,1.3,2.9,2.8,2.8C91.2,13.2,92.4,11.9,92.4,10.3z"></path>
    <path id="XMLID_71_" className="fill-white" d="M97.1,10.5l0.2-1.2c0.3-2.3,2.4-4.1,4.8-3.8c2.5,0.3,4,2.6,3.7,4.9l-0.2,1.2
		c-0.3,2.4-2.5,4-4.8,3.8C98.3,15.1,96.8,12.8,97.1,10.5z M104.1,11.4l0.2-1.2c0.2-1.6-0.9-3-2.4-3.2c-1.6-0.2-3,1-3.2,2.5l-0.2,1.2
		c-0.2,1.6,1,3,2.4,3.2C102.5,14.1,103.9,13,104.1,11.4z"></path>
    <path id="XMLID_69_" className="fill-white" d="M109.1,12.3l1.3-4.6c0.1-0.4,0.5-0.6,0.9-0.5c0.4,0.1,0.6,0.5,0.5,0.9l-1.3,4.6
		c-0.5,1.8,0.2,3,1.8,3.5c0.9,0.3,1.6,0.2,2.3-0.2c0.7-0.4,1.1-1,1.3-1.7l1.3-4.6c0.1-0.4,0.5-0.6,0.9-0.5c0.4,0.1,0.6,0.5,0.5,0.9
		l-2.3,8.1c-0.1,0.4-0.5,0.6-0.9,0.5c-0.4-0.1-0.6-0.5-0.5-0.9l0.3-1.1c-1.2,1-2.3,1.3-3.7,0.9C109.1,16.9,108.3,15.1,109.1,12.3z"></path>
    <path id="XMLID_67_" className="fill-white" d="M119.1,19.2c0.2-0.3,0.6-0.5,0.9-0.4l1.1,0.5l3.2-7.1c0.2-0.4,0.6-0.5,0.9-0.4
		c0.3,0.2,0.5,0.6,0.3,0.9l-0.4,0.9c1.5-0.7,2.5-0.7,3.3-0.3c0.7,0.3,1.5,1,2,1.8c0.1,0.2,0.1,0.4,0.1,0.5c-0.1,0.3-0.4,0.6-0.8,0.5
		c-0.2-0.1-0.3-0.2-0.4-0.3c-0.3-0.6-0.7-0.9-1.2-1.1c-1.6-0.7-3.3-0.1-3.9,1.4l-1.7,3.8l2.6,1.2c0.3,0.2,0.5,0.6,0.3,0.9
		c-0.2,0.3-0.6,0.5-0.9,0.3l-4.9-2.2C119.1,20,119,19.6,119.1,19.2z"></path>
    <path id="XMLID_65_" className="fill-white" d="M129.6,24.2c0.1-0.2,0.3-0.3,0.4-0.3l9-2.7l-4.7-3c-0.3-0.2-0.4-0.7-0.2-1
		c0.2-0.3,0.7-0.4,1-0.2l6,3.9c0.4,0.2,0.4,0.7,0.2,1c-0.1,0.2-0.2,0.3-0.4,0.3l-9,2.7l5.1,3.3c0.3,0.2,0.4,0.7,0.2,1
		c-0.2,0.3-0.7,0.4-1,0.2l-6.5-4.2C129.5,25,129.4,24.5,129.6,24.2z"></path>
    <path id="XMLID_62_" className="fill-white" d="M141.8,28.1l0.8-0.9c1.6-1.8,4.3-2,6.1-0.4c1.9,1.7,1.8,4.4,0,6.4c-0.4,0.4-0.8,0.4-1.1,0.1
		l-4.8-4.2c-1.1,1.2-0.8,3,0.3,4c0.9,0.8,1.9,0.7,2.8,0.5c0.2-0.1,0.5,0,0.7,0.1c0.3,0.3,0.4,0.7,0.1,1c-0.1,0.1-0.2,0.2-0.4,0.3
		c-1,0.5-3,0.3-4.3-0.8C140.4,32.7,140.3,29.9,141.8,28.1z M148.1,31.7c1-1.5,0.7-2.9-0.3-3.8c-1.2-1.1-2.9-0.9-3.9,0.1L148.1,31.7z
		"></path>
    <path id="XMLID_59_" className="fill-white" d="M147.9,38.5c0.3-0.2,0.8-0.2,1.1,0.1l2.2,2.6l5.2-4.4l-2.2-2.6c-0.3-0.3-0.2-0.8,0.1-1.1
		c0.3-0.2,0.8-0.2,1.1,0.1l2.7,3.2c0.3,0.3,0.2,0.8-0.1,1.1l-5.8,4.9l1.8,2.2c0.3,0.3,0.2,0.8-0.1,1.1c-0.3,0.3-0.8,0.2-1.1-0.1
		l-5-5.9C147.5,39.3,147.5,38.8,147.9,38.5z M159.3,33.5c0.5-0.4,1.3-0.4,1.7,0.1c0.5,0.6,0.3,1.3-0.2,1.8c-0.5,0.5-1.3,0.4-1.7-0.1
		C158.6,34.6,158.8,33.9,159.3,33.5z"></path>
    <path id="XMLID_57_" className="fill-white" d="M154.8,48c0-0.2,0.2-0.4,0.3-0.5c0.1-0.1,0.2-0.1,0.3-0.1c0.1,0,0.2,0,0.3,0l4.8,0.7l1.5-4.6
		c0-0.1,0.1-0.2,0.1-0.2c0-0.1,0.1-0.1,0.2-0.2c0.2-0.1,0.4-0.1,0.6-0.1c0.2,0,0.4,0.2,0.5,0.3c0.1,0.2,0.2,0.4,0.1,0.6l-1.4,4.4
		l4.6,0.7c0.2,0,0.4,0.1,0.5,0.3c0.1,0.2,0.1,0.4,0.1,0.6c0,0.2-0.1,0.3-0.3,0.5c-0.1,0-0.1,0.1-0.2,0.1c-0.1,0-0.2,0-0.3,0
		l-4.8-0.7l-1.5,4.6c0,0.1-0.1,0.2-0.1,0.2c0,0.1-0.1,0.1-0.2,0.2c-0.2,0.1-0.4,0.1-0.6,0.1c-0.2,0-0.4-0.2-0.5-0.3
		c-0.1-0.2-0.2-0.4-0.1-0.6l1.5-4.4l-4.6-0.7c-0.2,0-0.4-0.2-0.5-0.3C154.8,48.4,154.8,48.2,154.8,48z"></path>
    <path id="XMLID_55_" className="fill-white" d="M162.7,68.1c0.1-0.2,0.2-0.3,0.4-0.3c0.2,0,0.3,0,0.5,0.1c0.2,0.1,0.3,0.2,0.3,0.4l2.3,9
		c0.1,0.2,0,0.4-0.1,0.5c-0.1,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3,0-0.5-0.1c-0.2-0.1-0.3-0.2-0.3-0.4l-2.3-9
		C162.6,68.5,162.6,68.3,162.7,68.1z"></path>
    <path id="XMLID_53_" className="fill-white" d="M169.1,91.2c0.5,0,0.7,0.4,0.7,0.8l-0.1,2.5l7.1,0.3l0.1-2.5c0-0.5,0.3-0.7,0.7-0.7
		c0.4,0,0.6,0.3,0.6,0.7l-0.1,2.5l2.2,0.1c1.6,0.1,2.7,1.3,2.7,2.8c-0.1,1.5-1.4,2.6-2.7,2.6c-0.6,0-0.9-0.3-0.9-0.8
		c0-0.5,0.4-0.7,0.9-0.7c0.9,0,1.3-0.3,1.4-1.1c0-0.8-0.4-1.2-1.4-1.3l-2.2-0.1l-0.1,3.1c0,0.5-0.3,0.7-0.7,0.7
		c-0.4,0-0.7-0.3-0.6-0.7l0.1-3.2l-7.1-0.3l-0.1,3.1c0,0.4-0.4,0.7-0.8,0.7c-0.5,0-0.7-0.4-0.7-0.8l0.3-7.1
		C168.3,91.5,168.7,91.2,169.1,91.2z"></path>
    <path id="XMLID_51_" className="fill-white" d="M168.4,102.8c0.4,0.1,0.6,0.4,0.6,0.8l-0.2,1.2l7.7,1.5c0.5,0.1,0.6,0.5,0.6,0.8
		c-0.1,0.4-0.4,0.6-0.8,0.6l-1-0.2c1,1.2,1.3,2.2,1.1,3.2c-0.1,0.7-0.6,1.7-1.3,2.3c-0.2,0.2-0.3,0.2-0.5,0.2
		c-0.3,0-0.7-0.3-0.7-0.7c0-0.2,0.1-0.4,0.2-0.5c0.5-0.5,0.7-0.9,0.8-1.4c0.3-1.7-0.7-3.2-2.3-3.5l-4.1-0.8l-0.5,2.8
		c-0.1,0.4-0.4,0.6-0.8,0.6c-0.4-0.1-0.6-0.4-0.6-0.8l1-5.3C167.6,102.9,168,102.7,168.4,102.8z"></path>
    <path id="XMLID_48_" className="fill-white" d="M169.4,115.3l1.2,0.4c2.2,0.8,3.5,3.2,2.7,5.5c-0.8,2.3-3.3,3.4-5.5,2.6l-1.2-0.4
		c-2.3-0.8-3.4-3.3-2.7-5.5C164.6,115.6,167.2,114.6,169.4,115.3z M167,122l1.2,0.4c1.5,0.5,3.1-0.2,3.6-1.7
		c0.5-1.5-0.3-3.1-1.7-3.6l-1.2-0.4c-1.5-0.5-3.1,0.3-3.6,1.7C164.7,119.9,165.5,121.5,167,122z"></path>
    <path id="XMLID_46_" className="fill-white" d="M161.8,125.2l7.4,4c0.4,0.2,0.5,0.6,0.3,1c-0.2,0.4-0.7,0.5-1,0.3l-0.9-0.5
		c0.7,1.2,0.8,2.3,0.1,3.6c-1.2,2.2-3.1,2.8-5.7,1.4l-4.3-2.3c-0.4-0.2-0.5-0.7-0.3-1c0.2-0.4,0.7-0.5,1-0.3l4.3,2.3
		c1.7,0.9,3,0.4,3.8-1c0.9-1.8,0.1-3.3-1.1-4l-4.3-2.3c-0.4-0.2-0.5-0.6-0.3-1C161,125.2,161.4,125,161.8,125.2z"></path>
    <path id="XMLID_44_" className="fill-white" d="M157.5,138.4l3.9,2.9l1.1-1.5c0.3-0.4,0.7-0.4,1-0.2c0.3,0.2,0.4,0.6,0.1,1l-1.1,1.5l2.2,1.7
		c0.3,0.2,0.4,0.7,0.2,1.1c-0.3,0.3-0.7,0.4-1.1,0.1l-2.2-1.7l-3,4.1c-0.3,0.4-0.7,0.4-0.9,0.2c-0.3-0.2-0.4-0.6-0.1-1l3-4.1
		l-3.9-2.9c-1-0.7-2.3-0.6-3.1,0.4c-0.7,1-0.5,2.3,0.5,3c0.3,0.3,0.4,0.7,0.2,1c-0.2,0.3-0.7,0.4-1,0.2c-1.6-1.2-2-3.5-0.8-5.1
		C153.6,137.5,155.9,137.2,157.5,138.4z"></path>
    <path id="XMLID_42_" className="fill-white" d="M151.2,147.7c0.2,0,0.3,0.1,0.5,0.2c0.1,0.1,0.2,0.3,0.2,0.5c0,0.2-0.1,0.4-0.2,0.5l-4,4
		c-0.2,0.2-0.3,0.2-0.5,0.2c-0.2,0-0.3-0.1-0.5-0.2c-0.1-0.1-0.2-0.3-0.2-0.5c0-0.2,0-0.4,0.2-0.5l4-4
		C150.8,147.8,151,147.7,151.2,147.7z"></path>
    <path id="XMLID_39_" className="fill-white" d="M142.8,155.4l0.7,1c1.4,1.9,1.1,4.6-0.9,6.1c-2.1,1.5-4.7,0.8-6.2-1.3
		c-0.3-0.5-0.2-0.9,0.1-1.1l5.1-3.8c-1-1.3-2.7-1.5-4-0.5c-1,0.8-1,1.7-1,2.6c0,0.2-0.1,0.5-0.3,0.7c-0.3,0.2-0.8,0.2-1-0.1
		c-0.1-0.1-0.1-0.3-0.2-0.4c-0.3-1.1,0.3-3,1.7-4.1C138.6,153.1,141.4,153.5,142.8,155.4z M137.9,160.8c1.2,1.3,2.7,1.3,3.8,0.5
		c1.3-1,1.5-2.6,0.7-3.8L137.9,160.8z"></path>
    <path id="XMLID_37_" className="fill-white" d="M131.1,159.3l3.9,7.4c0.2,0.4,0.1,0.8-0.3,1c-0.4,0.2-0.8,0-1-0.3l-0.5-0.9
		c-0.1,1.4-0.6,2.3-2,3.1c-2.2,1.2-4.2,0.6-5.5-2l-2.3-4.3c-0.2-0.4,0-0.8,0.3-1c0.4-0.2,0.8,0,1,0.3l2.3,4.3c0.9,1.7,2.2,2,3.7,1.3
		c1.8-0.9,1.9-2.7,1.3-3.9l-2.3-4.3c-0.2-0.4,0-0.8,0.3-1C130.5,158.8,130.9,158.9,131.1,159.3z"></path>
    <path id="XMLID_34_" className="fill-white" d="M122.3,167.8l0.3,1c0.9,2.4-0.5,4.9-2.6,5.6c-1.1,0.4-2,0.3-3-0.1l1.8,5
		c0.1,0.4-0.1,0.8-0.5,0.9c-0.3,0.1-0.8,0-0.9-0.5l-4.4-12.6c-0.1-0.4,0.1-0.8,0.4-1c0.4-0.1,0.8,0.1,1,0.5l0.1,0.3
		c0.5-1,1.3-1.6,2.3-2C119,164.3,121.5,165.5,122.3,167.8z M115.7,170.2l0.3,1c0.5,1.5,2.1,2.3,3.6,1.8s2.2-2.1,1.7-3.7l-0.3-1
		c-0.5-1.5-2.2-2.3-3.6-1.8C115.9,167,115.1,168.6,115.7,170.2z"></path>
    <path id="XMLID_31_" className="fill-white" d="M98.8,173.7l0,1c0.1,2.5-1.9,4.5-4.1,4.6c-1.1,0.1-2-0.3-2.8-1l0.2,5.3c0,0.4-0.3,0.8-0.7,0.8
		c-0.3,0-0.7-0.2-0.8-0.7l-0.6-13.3c0-0.4,0.3-0.8,0.7-0.8c0.4,0,0.8,0.3,0.8,0.7l0,0.3c0.8-0.8,1.7-1.2,2.8-1.2
		C96.7,169.4,98.7,171.3,98.8,173.7z M91.8,174l0,1c0.1,1.6,1.4,2.9,2.9,2.8c1.5-0.1,2.8-1.3,2.7-3l0-1c-0.1-1.6-1.4-2.8-2.9-2.8
		C92.9,171.1,91.7,172.3,91.8,174z"></path>
    <path id="XMLID_28_" className="fill-white" d="M86.3,173.9l-0.1,1.2c-0.2,2.4-2.3,4.1-4.8,3.9c-2.6-0.3-4-2.6-3.7-5.2
		c0.1-0.6,0.4-0.8,0.8-0.8l6.3,0.7c0.2-1.6-1-2.9-2.6-3.1c-1.3-0.1-1.9,0.5-2.5,1.2c-0.2,0.2-0.4,0.3-0.7,0.3
		c-0.4,0-0.7-0.4-0.7-0.7c0-0.1,0.1-0.3,0.1-0.4c0.6-1,2.3-2,4-1.8C84.8,169.4,86.6,171.5,86.3,173.9z M79.1,174.6
		c0.1,1.8,1.1,2.8,2.4,2.9c1.6,0.2,2.9-0.9,3.1-2.3L79.1,174.6z"></path>
    <path id="XMLID_26_" className="fill-white" d="M71.9,167.7l1.3,9.4c-0.1,0.4-0.5,0.6-0.9,0.5c-0.3-0.1-0.5-0.3-0.5-0.6l-1.1-7.3l-4.5,5.9
		c-0.2,0.3-0.5,0.3-0.8,0.3c-0.4-0.1-0.6-0.5-0.6-0.9l5.7-7.6c0.2-0.2,0.4-0.3,0.7-0.2C71.7,167.2,71.8,167.3,71.9,167.7z"></path>
    <path id="XMLID_23_" className="fill-white" d="M62.6,169l-0.5,1.1c-0.9,2.2-3.4,3.2-5.7,2.3c-2.4-1-3.1-3.6-2-6.1c0.2-0.5,0.6-0.6,1-0.5
		l5.9,2.5c0.6-1.5-0.1-3.1-1.6-3.7c-1.2-0.5-2,0-2.8,0.4c-0.2,0.1-0.5,0.2-0.7,0.1c-0.4-0.2-0.6-0.6-0.4-0.9c0-0.1,0.2-0.3,0.3-0.4
		c0.8-0.8,2.8-1.3,4.4-0.6C62.5,164.2,63.5,166.8,62.6,169z M55.5,167.5c-0.5,1.7,0.2,3,1.5,3.5c1.5,0.6,3,0,3.7-1.3L55.5,167.5z"></path>
    <path id="XMLID_21_" className="fill-white" d="M50.4,162.2l-5,8.4l2,1.2c0.3,0.2,0.5,0.6,0.2,1c-0.3,0.4-0.7,0.5-1,0.3l-2.6-1.6
		c-0.3-0.2-0.5-0.6-0.2-1l5.4-9.1c0.6-1,0.2-2.2-0.7-2.7c-0.9-0.6-2.2-0.2-2.7,0.7c-0.2,0.4-0.7,0.5-1,0.3c-0.3-0.2-0.5-0.6-0.2-1
		c1-1.6,3.1-2.2,4.8-1.3C50.8,158.4,51.4,160.6,50.4,162.2z"></path>
    <path id="XMLID_18_" className="fill-white" d="M41.5,157.5l-0.8,0.9c-1.5,1.8-4.2,2.1-6.1,0.6c-1.9-1.6-2-4.3-0.5-6.1l0.8-0.9
		c1.6-1.9,4.3-2,6.1-0.6C42.9,153,43,155.7,41.5,157.5z M36.1,152.9l-0.8,0.9c-1,1.2-0.9,3,0.3,4c1.2,1,3,0.8,4-0.4l0.8-0.9
		c1-1.2,0.8-3-0.3-4C38.9,151.5,37,151.7,36.1,152.9z"></path>
    <path id="XMLID_15_" className="fill-white" d="M38.4,143.9l-9.8,8.6c-0.3,0.3-0.8,0.2-1-0.1c-0.3-0.3-0.2-0.8,0.1-1l0.7-0.6
		c-1.3,0.2-2.4-0.2-3.3-1.1c-1.4-1.7-1.2-4.4,0.6-6l0.8-0.7c1.8-1.6,4.5-1.6,6,0c0.8,0.9,1.1,2.1,0.8,3.5l4.2-3.7
		c0.3-0.3,0.8-0.3,1.1,0.1C38.7,143.2,38.7,143.6,38.4,143.9z M27.5,144.1l-0.8,0.7c-1.1,1-1.4,2.8-0.3,4c1.1,1.2,2.9,1.2,4.1,0.2
		l0.8-0.7c1.2-1.1,1.4-2.9,0.3-4C30.5,143.1,28.7,143,27.5,144.1z"></path>
    <path id="XMLID_12_" className="fill-white" d="M24.4,140l-1,0.7c-2,1.3-4.7,0.8-6-1.3c-1.4-2.2-0.5-4.7,1.7-6.2c0.5-0.3,0.9-0.2,1.1,0.2
		l3.5,5.3c1.3-0.9,1.6-2.6,0.8-3.9c-0.7-1.1-1.6-1.1-2.5-1.2c-0.2,0-0.5-0.1-0.7-0.3c-0.2-0.3-0.1-0.8,0.1-1
		c0.1-0.1,0.3-0.1,0.4-0.2c1.2-0.2,3,0.5,3.9,2C27,136,26.4,138.7,24.4,140z M19.4,134.9c-1.4,1.2-1.5,2.6-0.7,3.7
		c0.9,1.4,2.5,1.7,3.8,1L19.4,134.9z"></path>
    <path id="XMLID_10_" className="fill-white" d="M21.5,128.4c-0.3,0.2-0.8,0-0.9-0.4l-0.5-1.1l-7.1,3.2c-0.4,0.2-0.8,0-0.9-0.3
		c-0.1-0.3,0-0.8,0.4-0.9l0.9-0.4c-1.6-0.4-2.3-1.1-2.7-1.9c-0.3-0.7-0.5-1.7-0.3-2.6c0.1-0.2,0.2-0.4,0.3-0.4
		c0.3-0.2,0.7-0.2,1,0.2c0.1,0.2,0.1,0.4,0.1,0.5c-0.1,0.7-0.1,1.1,0.2,1.7c0.7,1.6,2.4,2.2,3.9,1.5l3.8-1.7l-1.2-2.6
		c-0.2-0.3,0-0.8,0.4-0.9c0.3-0.2,0.8,0,0.9,0.4l2.2,4.9C22,127.8,21.8,128.2,21.5,128.4z"></path>
    <path id="XMLID_8_" className="fill-white" d="M16.5,107c-0.1,0.1-0.3,0.2-0.5,0.2c-0.2,0-0.3,0-0.5-0.1c-0.2-0.1-0.3-0.3-0.3-0.5l-1.2-9.2
		c0-0.2,0-0.4,0.2-0.5c0.1-0.1,0.3-0.2,0.5-0.2c0.2,0,0.3,0,0.5,0.1c0.2,0.1,0.3,0.3,0.3,0.5l1.2,9.2
		C16.7,106.7,16.6,106.9,16.5,107z"></path>
</g>
    <g className="logo-letter" id="XMLID_1_">
	<path id="XMLID_2_" className="fill-white" d="M80.2,124.4c-2.7,4.4-6.3,6.3-10.1,6.3c-5.9,0-10.1-3.7-10.7-12.5c3.2-0.5,5.2-4.7,5.2-11.1
		c0-5.2-1.4-12-4.7-19.7c1.7-0.7,3.4-1,5-1c0.3-2.5,0.4-5,0.4-7.6c0-8.7-1.6-17.1-3.9-21.5c2.3-1.1,4.6-1.6,6.7-1.6
		c4.6,0,8.3,2.2,10.1,5.1c3.3-4,8.4-5.9,14.3-5.9c4.3,0,8.1,0.6,11.4,0.6c3.3,0,6-0.6,8.3-2.8c1.7,1.6,2.8,4.4,2.8,7.4
		c0,1.9-0.5,3.9-1.5,5.5c3.1,3,4.5,6.9,4.5,11c0,5-2,10.3-5.2,14.3c3.3,2.1,6.4,4.8,9.3,5.5c-0.7,2-1.6,3.7-2.5,4.9
		c1.6,2.8,2.3,5.5,2.3,8c0,4.8-2.6,8.8-6.4,10.6c-1.4,7.4-8.4,11.4-17.3,11.4C92.2,131.5,84.8,129.5,80.2,124.4z M111.9,121.4
		c-2.2,3.6-6.5,4.8-10.7,4.8c-3.6,0-7.3-0.9-9.4-2.1c2.1,0.5,4.8,0.8,7.4,0.8c4.8,0,9.8-1,12.5-3.6c-1.8,1-3.4,1.5-4.9,1.5
		c-1.6,0-3-0.5-4.5-1.4c1.6,0.1,3.2,0.2,4.7,0.2c1.7,0,3.3-0.2,4.5-0.6c-2.3,0-4.8-0.8-7.3-2.5c-1.7,2.3-4.8,4-8.7,4
		c-9.2,0-13.3-6.7-13.3-15c0-2,0.3-4.3,0.8-6.4c0,0.7-0.1,1.5-0.1,2.1c0,10,4,17.1,12.4,17.1c5.3,0,8-3.9,8-8c0-1.9-0.7-4.1-1.9-5.7
		c0.4,1.1,0.6,2.2,0.6,3.3c0,3.8-2.4,7.2-7,7.2c-3.4,0-6.3-1.8-8.1-5.3c2.1,2.2,4.1,4,7.8,4c3.9,0,6.7-3.3,6.7-7.7
		c0-0.5,0-1-0.1-1.5c-0.2,3.5-3.1,6.7-6.6,6.7c-1.1,0-2.2-0.4-3.4-1.1c0.6,0.1,1.1,0.2,1.6,0.2c4.2,0,7.4-3.6,8.1-5.8
		c-1.6,2.3-4.8,4.5-8.3,4.5c-4.3,0-6.8-3.2-6.8-8c0-5.4,2.5-8.1,5.3-8.1c4.6,0,6.5,4.9,6.6,11.7c1.3-1,2.3-2.1,3.2-3.6
		c3.4,2.8,5,6.5,5,9.9c0,1.3-0.2,2.5-0.7,3.7c1.9,1.2,3.9,1.7,5.5,1.7c4.6,0,8-3.7,8-9.2c0-1.6-0.4-3.5-1.1-5.4
		c0.4,1.3,0.6,2.5,0.6,3.8c0,4.4-2.4,8-6.7,8c-0.7,0-1.4-0.1-2.1-0.3c4.3-0.4,8.2-3.1,8.2-9.7c0-0.6-0.1-1.1-0.1-1.6
		c-0.2,5.3-2.5,7.7-5.6,7.7c-1.6,0-3.3-0.6-5-1.6c1.3,0.4,2.4,0.6,3.5,0.6c3.8,0,6.4-2.4,7-6.6c-0.7,2.7-3,4.2-5.7,4.2
		c-3,0-6.6-1.7-9.1-5.4c2.8,2.8,6.1,4,8.8,4c2.7,0,4.9-1.1,5.9-2.8c-1.4,0.8-2.9,1.2-4.5,1.2C103.7,104.8,98,92,89.2,92
		c-5.6,0-9.2,4.9-9.9,11.3c0-0.5-0.1-1-0.1-1.5c0-7.8,5.2-11.4,10.4-11.4c9.3,0,16.4,11.4,23.2,11.4c0.1,0,0.2,0,0.3,0
		c2.5-0.1,4.4-1.1,5.6-3.9c-1.6,1.3-3.1,1.7-4.5,1.7c-4.6,0-8.1-6-15.4-9.2c8,1.8,12,7.9,16.9,7.9c0.9,0,1.8-0.3,2.9-0.8
		c-4.3-1.4-10.9-8.9-16.1-8.9c-0.2,0-0.3,0-0.5,0c1.1-0.5,2.1-0.6,3.2-0.6c1.7,0,3.5,0.5,5,1.3c-0.7-3-1.4-5.1-2.6-7.3
		c2.4,1.3,2.9,3.6,2.9,6.3c0,0.4,0,0.7,0,1c0.6-3.1,0.9-5.8,0.9-8.3c0-3-0.5-5.6-1.5-7.9c1.8,1.8,2.8,4.4,2.8,7.5
		c0,2.6-0.7,5.5-2,8.6c2.9-3.7,4.6-8.3,4.6-12.6c0-3.4-1-6.5-3.1-9c-1.3,1.2-2.9,2-4.8,2.3c0.7,1.6,1,3.3,1,4.9
		c0,6.7-4.1,12.5-10.1,12.5c-1.4,0-2.7-0.4-4-1c-1,0.7-2,1.2-3.5,1.2c-3.7,0-6.5-2.6-6.5-8.2c0-5,1.9-8.8,6.2-8.8
		c3.7,0,5.1,3.2,5.1,7c0,2-0.6,4-1.5,5.2c3.3-1.7,4.1-5.9,4.1-8.8c0-0.6-0.1-1.1-0.1-1.6c0.8,1.1,1.2,2.4,1.2,3.9c0,3-1.8,6.2-5,6.8
		c0.2,0,0.5,0.1,0.7,0.1c2.8,0,6.3-3.2,6.3-7.4c0-5.4-3.8-7.3-8.2-7.7c0.8-0.1,1.5-0.2,2.1-0.2c4.8,0,7.7,3.5,7.7,7.9
		c0,4.2-2.8,7.9-6.5,7.9c-0.7,0-1.3-0.1-1.9-0.3c1.1,1.1,2.4,1.4,3.7,1.4c4.7,0,7.4-5,7.4-9.6c0-6.1-4.6-10.5-11.1-10.5
		c-7.4,0-12.8,4.9-12.8,14.4c0,0.5,0,1,0,1.5c-0.7-1.6-1-3.3-1-4.9c0-6.6,4.9-13,14.1-13c5.5,0,9.2,1.9,11.4,4.8
		c4.2-1.2,6.4-5.2,6.4-8.4c0-0.9-0.2-1.6-0.5-2.3c0.1,0.4,0.1,0.7,0.1,1.1c0,3.1-2.5,6.4-6.8,6.4c-0.3,0-0.5,0-0.7,0
		c4-1,7.2-4.9,7.2-7.5v-0.1c-0.8,3.3-4,4.8-9.2,4.8c-1.9,0-5-0.4-8.2-0.4c-5.5,0-11.6,1.2-14.3,7.9c1.8-7.8,7.9-8.9,14.3-8.9
		c2.7,0,5.6,0.2,8.1,0.2c6.2,0,8.1-1.6,9-3.8c-2.2,1.6-4.7,1.9-7.4,1.9c-3.5,0-7.5-0.7-11.7-0.7c-10.1,0-16.6,6.1-16.6,18.1
		c0,2.9,0.5,6.7,2,10.5c-2.5-2.6-3.8-7.5-3.8-12.5c0-4.3,1-7.8,2.6-10.6c-2.2-3.3-5.5-4.6-8.7-4.6c-0.7,0-1.5,0.1-2.1,0.2
		c5.6,0,7.4,3,7.5,7.8c-1.5-3.7-2.6-6.7-7.8-7.6c4.4,1.7,6.3,7.5,6.3,15.2c0,2.6-0.2,5.3-0.6,8.2c0-0.3,0-0.5,0-0.8
		c0-10.4-1.9-19.7-5.7-22.3c1.8,4.5,2.8,10.4,2.8,17.6c0,3-0.1,6.2-0.5,9.7c4.6,1.2,8.1,5.3,8.1,12.7c0,2-0.3,4.5-1,7.1
		c0.1-1,0.1-1.9,0.1-2.8c0-11.9-5.4-14.5-9.1-14.5c-0.7,0-1.4,0.1-1.8,0.2c7,0.1,8.3,4.9,8.3,10c0,0.6,0,1.1,0,1.6
		c-1-4.9-2-10.5-8.5-11.5c4.4,1.6,6.3,7,6.3,12.9c0,1.5-0.2,3-0.4,4.5c-0.1-6.9-2.6-15.3-5.9-17.2c2.4,5.4,3.9,12.2,3.9,18
		c0,5.5-1.3,10.1-4.1,11.8c4.3-1.6,7.8-7.7,8.3-12.4c0.1,0.8,0.2,1.6,0.2,2.3c0,4.5-2.2,8.7-8.8,10.5c0.6,0.1,1.2,0.2,1.8,0.2
		c3,0,6.8-1.4,8.8-3.9c-0.9,3.1-3.6,4.9-6.7,4.9c-1.4,0-2.7-0.3-4.1-1c1.2,1.5,3.7,2.7,6.3,2.7c1.9,0,3.8-0.6,5.3-2.1
		c-1.1,2.4-3.3,3.6-5.6,3.6c-2.6,0-5.2-1.4-6.3-4.2c0.6,3.7,3,6.9,7.1,6.9c3.8,0,6.7-3.3,7.9-5.4c-1.4-2.1-2.3-4.8-2.7-7.8
		c4,10.8,14,14.2,23,14.2C105.1,128.1,109.9,125.7,111.9,121.4z M92.2,85c-0.7-0.7-1.2-1.6-1.4-2.3c1.6-1,2.4-3.2,2.4-5.4
		c0-2.4-0.9-4.2-2.8-4.2c-2.7,0-3.7,3.1-3.7,6.3c0,3.8,1.4,5.9,4,5.9C91.4,85.3,91.9,85.2,92.2,85z M95,107.9
		c-0.1-7.4-1.6-10.3-3.8-10.3s-2.8,2.4-2.8,4.8c0,3.4,1.2,5.9,4.1,5.9C93.3,108.4,94.1,108.2,95,107.9z"></path>
</g>
</svg>
);