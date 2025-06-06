import { Button, Flex, Image, Link, Text } from '@invoke-ai/ui-library';
import { useAppDispatch } from 'app/store/storeHooks';
import { useIsWorkflowUntouched } from 'features/nodes/components/sidePanel/workflow/IsolatedWorkflowBuilderWatcher';
import { useWorkflowLibraryModal } from 'features/nodes/store/workflowLibraryModal';
import { workflowModeChanged } from 'features/nodes/store/workflowLibrarySlice';
import InvokeLogoSVG from 'public/assets/images/invoke-symbol-wht-lrg.svg';
import { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';

export const EmptyState = () => {
  const isWorkflowUntouched = useIsWorkflowUntouched();

  return (
    <Flex w="full" h="full" userSelect="none" justifyContent="center">
      <Flex
        alignItems="center"
        justifyContent="center"
        borderRadius="base"
        flexDir="column"
        gap={5}
        maxW="230px"
        pt={24}
      >
        <Image
          src={InvokeLogoSVG}
          alt="invoke-ai-logo"
          opacity={0.2}
          mixBlendMode="overlay"
          w={16}
          h={16}
          minW={16}
          minH={16}
          userSelect="none"
        />
        {isWorkflowUntouched ? <CleanEditorContent /> : <DirtyEditorContent />}
      </Flex>
    </Flex>
  );
};

const CleanEditorContent = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const workflowLibraryModal = useWorkflowLibraryModal();

  const onClickNewWorkflow = useCallback(() => {
    dispatch(workflowModeChanged('edit'));
  }, [dispatch]);

  return (
    <>
      <Flex gap={2}>
        <Button size="sm" onClick={onClickNewWorkflow}>
          {t('nodes.newWorkflow')}
        </Button>
        <Button size="sm" colorScheme="invokeBlue" onClick={workflowLibraryModal.open}>
          {t('nodes.loadWorkflow')}
        </Button>
      </Flex>
      <Text textAlign="center" fontSize="md">
        <Trans i18nKey="nodes.workflowHelpText" size="sm" components={workflowHelpTextComponents} />
      </Text>
    </>
  );
};

const DirtyEditorContent = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onClick = useCallback(() => {
    dispatch(workflowModeChanged('edit'));
  }, [dispatch]);

  return (
    <>
      <Text textAlign="center" fontSize="md">
        {t('nodes.noFieldsViewMode')}
      </Text>
      <Button size="sm" colorScheme="invokeBlue" onClick={onClick}>
        {t('nodes.edit')}
      </Button>
    </>
  );
};

const workflowHelpTextComponents = {
  LinkComponent: (
    <Link
      fontSize="md"
      fontWeight="semibold"
      href="https://support.invoke.ai/support/solutions/articles/151000159663-example-workflows"
      target="_blank"
    />
  ),
};
