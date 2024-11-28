(function autoDino() {
    const jump = () => {
        const evt = new KeyboardEvent('keydown', { keyCode: 32 });
        document.dispatchEvent(evt);
    };

    const duck = () => {
        const evt = new KeyboardEvent('keydown', { keyCode: 40 });
        document.dispatchEvent(evt);
    };

    const unduck = () => {
        const evt = new KeyboardEvent('keyup', { keyCode: 40 });
        document.dispatchEvent(evt);
    };

    const checkObstacles = () => {
        const runner = Runner.instance_;
        if (runner && runner.horizon.obstacles.length > 0) {
            const obstacle = runner.horizon.obstacles[0];
            const tRex = runner.tRex;

            // 새 감지 및 숙이기 타이밍 조정
            if (obstacle.yPos < 75) { // 높이가 낮은 장애물 (새)
                if (obstacle.xPos < 150 && obstacle.xPos > 0) { 
                    // 새가 일정 거리(100~70) 안으로 들어왔을 때 숙이기
                    if (!tRex.ducking) duck();
                } else {
                    // 새가 없거나 거리를 벗어났으면 숙이기 해제
                    if (tRex.ducking) unduck();
                }
            } else {
                // 다른 장애물 처리: 숙이기 해제
                if (tRex.ducking) unduck();
            }

            // 땅 장애물 점프 처리
            if (
                obstacle.yPos >= 75 && // 높이가 높은 장애물 (땅 장애물)
                obstacle.xPos < 120 && // 점프 타이밍 (120 이하)
                obstacle.xPos > 50 &&  // 점프 범위
                !tRex.jumping
            ) {
                jump();
            }
        }

        // 죽었을 경우 게임 자동 재시작
        if (runner.crashed) {
            runner.restart();
        }

        requestAnimationFrame(checkObstacles); // 루프 유지
    };

    checkObstacles(); // 루프 시작
})();
