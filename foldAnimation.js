export function animateFold(parts) {

    const speed = 0.12;

    const panels = {

        left: {
            pivot: parts.leftPivot,
            axis: "y",
            open: 0,
            closed: Math.PI / 2,
            value: 0,
            target: 0
        },

        right: {
            pivot: parts.rightPivot,
            axis: "y",
            open: 0,
            closed:-Math.PI / 2,
            value: 0,
            target: 0
        },

        top: {
            pivot: parts.topPivot,
            axis: "x",
            open: 0,
            closed:Math.PI / 2,
            value: 0,
            target: 0
        },

        bottom: {
            pivot: parts.bottomPivot,
            axis: "x",
            open: 0,
            closed:Math.PI / 2,
            value: 0,
            target: 0
        },

        back: {
            pivot: parts.backPivot,
            axis: "y",
            open: 0,
            closed:Math.PI / 2,
            value: 0,
            target: 0
        }

    };

    function animate() {

        requestAnimationFrame(animate);

        Object.values(panels).forEach(panel => {

            panel.value += (panel.target - panel.value) * speed;

            const angle =
                panel.open +
                (panel.closed - panel.open) * panel.value;

            panel.pivot.rotation[panel.axis] = angle;

        });

    }

    animate();

    return {

        togglePanel(name) {

            if (!panels[name]) return;

            panels[name].target =
                panels[name].target === 1 ? 0 : 1;

        },

        foldPanel(name) {

            if (!panels[name]) return;

            panels[name].target = 1;

        },

        unfoldPanel(name) {

            if (!panels[name]) return;

            panels[name].target = 0;

        },

        foldAll() {

            Object.values(panels).forEach(panel => {

                panel.target = 1;

            });

        },

        unfoldAll() {

            Object.values(panels).forEach(panel => {

                panel.target = 0;

            });

        }

    };

}
